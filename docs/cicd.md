> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# CI/CD 自动发布热更新

在团队协作与高频迭代中，手动在本地电脑执行 `pushy bundle` 容易受本地依赖未对齐、未提交代码混入或忘记上传原生基准包的影响。

将 Pushy 接入 CI/CD 流水线后，无论是**发版时自动登记 APK / AAB / IPA 基准包**，还是**合并分支后自动打包热更新并按 10% 灰度放量**，都可以通过一条无交互命令完成。

## 接入前的四项核心准备

在编写任何 CI 脚本前，请确认满足以下四个条件：

1. **CLI 版本要求**：流水线安装的 `react-native-update-cli` 需 **>= 2.7.0**（支持通过环境变量读取 API Key），推荐始终安装最新版以支持内容指纹（`>= 2.8.5`）与 AAB（`>= 2.6.0`）。
2. **创建并注入 `PUSHY_API_TOKEN`**：在 [Pushy 管理后台](https://pushy-admin.reactnative.cn)「API Key」页面创建勾选了**读取（read）+ 写入（write）**&#x6743;限的密钥，存入 CI 平台的加密变量 `PUSHY_API_TOKEN`（切勿硬编码进仓库，详见 [API Key 文档](https://pushy.reactnative.cn/docs/api-token.md)）。
3. **提交 `update.json`（或显式传 `--appId`）**：项目根目录下的 `update.json` 只包含 `appId` 与公开的 `appKey`，不含账号凭证，请提交到 Git 仓库供 CI 识别目标应用；多环境工程也可通过 `--config` 或 `--appId` 覆盖。
4. **非交互模式必传 `--name` 与绑定参数**：CI 没有交互终端（TTY），CLI 会自动跳过「是否上传」「是否绑定」提问：
   - 不传 `--name`：只会本地生成 `.ppk`，**不会上传**；
   - 传了 `--name` 但未传绑定参数（如 `--packageVersionRange` 或 `--packageVersion`）：版本会上传到后台，但**不会绑定任何原生包，没有任何用户会收到**。

## 场景一：GitHub Actions 自动发布热更新（支持灰度比例与 Sourcemap）

下面的工作流支持两种触发方式：推送 `ota/*` 标签自动按 10% 灰度发布，或在 GitHub 页面手动触发（`workflow_dispatch`）并自由填写目标原生版本范围与灰度比例：

```yaml
# .github/workflows/pushy-ota.yml
name: Publish Pushy OTA

on:
  workflow_dispatch:
    inputs:
      package_range:
        description: "目标原生版本范围 (semver)"
        required: true
        default: ">=1.0.0 <2.0.0"
      rollout:
        description: "灰度比例 (1-100)"
        required: true
        default: "10"
      description:
        description: "更新说明"
        required: false
        default: "性能优化与问题修复"

jobs:
  ota:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        platform: [ios, android]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies & Pushy CLI
        run: |
          npm ci
          npm install -g react-native-update-cli

      - name: Bundle, publish and bind (${{ matrix.platform }})
        env:
          PUSHY_API_TOKEN: ${{ secrets.PUSHY_API_TOKEN }}
        run: |
          SHORT_SHA="${GITHUB_SHA::7}"
          pushy bundle \
            --platform "${{ matrix.platform }}" \
            --sourcemap \
            --no-interactive \
            --name "${GITHUB_REF_NAME}-${SHORT_SHA}" \
            --description "${{ inputs.description }} (${SHORT_SHA})" \
            --packageVersionRange "${{ inputs.package_range }}" \
            --rollout "${{ inputs.rollout }}"
```

:::tip 为什么要加上 `--sourcemap`？
打包 iOS 和 Android 热更新时无需 macOS 机器，在便宜快速的 `ubuntu-latest` 上即可同时完成双端 JS 打包与 sourcemap 归档。归档 sourcemap 后，一旦新版本在线上抛出异常，[JS 报错监控](https://pushy.reactnative.cn/docs/errors.md)与 [MCP 服务](https://pushy.reactnative.cn/docs/mcp.md)就能直接把压缩后的字节码行号还原到原始 TypeScript 源码位置。
:::

## 场景二：原生发版流水线自动登记基准包（防止漏传）

许多团队遇到「编译时间戳与服务器记录不一致」，根源都是打包工程师重打了 Release 包却忘记执行 `pushy uploadApk` / `uploadIpa`。把上传命令直接挂在原生构建脚本末尾即可根治这一人为失误：

### Android（单次构建同时产出 APK 与 AAB 并登记）

```yaml
# 在 Android Release 构建 Job 的构建步骤后追加
- name: Build Android Release APK & AAB
  run: cd android && ./gradlew clean assembleRelease bundleRelease

- name: Upload Android Baseline to Pushy
  env:
    PUSHY_API_TOKEN: ${{ secrets.PUSHY_API_TOKEN }}
  run: |
    npm install -g react-native-update-cli
    pushy uploadAab android/app/build/outputs/bundle/release/app-release.aab
```

### iOS（配合 Fastlane Gym / Xcode Archive）

在 `Fastfile` 的 `release` lane 中导出 `.ipa` 后直接调用 `pushy uploadIpa`：

```ruby
# ios/fastlane/Fastfile
lane :release do
  build_app(
    workspace: "ios/YourApp.xcworkspace",
    scheme: "YourApp",
    export_method: "app-store"
  )

  # 在上传 TestFlight / App Store Connect 前先向 Pushy 登记基准 IPA
  sh("npx --yes react-native-update-cli uploadIpa #{lane_context[SharedValues::IPA_OUTPUT_PATH]} --config ../update.json")

  upload_to_testflight
end
```

### 鸿蒙 HarmonyOS（上传 `.app` 基准包）

```bash
hvigorw assembleApp --mode project -p product=default -p buildMode=release --no-daemon
pushy uploadApp harmony/build/outputs/default/harmony-default-signed.app
```

## 场景三：GitLab CI 与 Jenkins 配置模板

### GitLab CI（`.gitlab-ci.yml`）

在 GitLab 项目 `Settings -> CI/CD -> Variables` 中配置 Masked 变量 `PUSHY_API_TOKEN`：

```yaml
publish_ota:
  stage: deploy
  image: node:22-bookworm
  rules:
    - if: '$CI_COMMIT_TAG =~ /^ota-/'
  parallel:
    matrix:
      - PLATFORM: [ios, android]
  script:
    - npm ci
    - npm install -g react-native-update-cli
    - |
      pushy bundle \
        --platform "$PLATFORM" \
        --sourcemap \
        --no-interactive \
        --name "$CI_COMMIT_TAG" \
        --description "Release $CI_COMMIT_TAG" \
        --packageVersionRange "${PACKAGE_RANGE:->=1.0.0 <2.0.0}" \
        --rollout "${ROLLOUT:-20}"
```

### Jenkins Declarative Pipeline（`Jenkinsfile`）

在 Jenkins 凭据管理中添加 `Secret text` 类型的凭据（ID 设为 `pushy-api-token`）：

```groovy
pipeline {
  agent any
  parameters {
    choice(name: 'PLATFORM', choices: ['android', 'ios', 'harmony'], description: '发布平台')
    string(name: 'PACKAGE_RANGE', defaultValue: '>=1.0.0 <2.0.0', description: '绑定的原生版本范围')
    string(name: 'ROLLOUT', defaultValue: '10', description: '灰度比例 (1-100)')
  }
  environment {
    PUSHY_API_TOKEN = credentials('pushy-api-token')
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm ci && npm install -g react-native-update-cli'
      }
    }
    stage('Bundle & Publish') {
      steps {
        sh '''
          pushy bundle \
            --platform "${PLATFORM}" \
            --sourcemap \
            --no-interactive \
            --name "build-${BUILD_NUMBER}-${GIT_COMMIT_SHORT}" \
            --description "Jenkins build #${BUILD_NUMBER}" \
            --packageVersionRange "${PACKAGE_RANGE}" \
            --rollout "${ROLLOUT}"
        '''
      }
    }
  }
}
```

## 进阶技巧：绑定预览（`--dryRun`）与多环境隔离

### 1. 先上传后用 `--dryRun` 校验命中范围

当线上同时维护多个历史原生版本、你不确定 `--packageVersionRange` 会命中哪些包时，可以把「上传热更包」和「绑定原生包」拆成两步，在绑定前用 `--dryRun`（需 `cli >= 1.45.4`）打印预览结果：

```bash
# 仅预览 >=1.2.0 <2.0.0 会匹配哪些已上传原生包，不实际修改线上绑定
pushy update \
  --platform android \
  --versionId 211343 \
  --packageVersionRange ">=1.2.0 <2.0.0" \
  --dryRun
```

观察完健康度指标（错误率、回滚率为 0）后，只需再次执行 `pushy update --versionId 211343 --platform android --packageVersionRange ">=1.2.0 <2.0.0" --rollout 100`，即可将灰度版本秒级提升为 100% 全量版本，无需重新打包上传。

### 2. Staging / Production 多环境与 Monorepo 配置

- **多环境配置切换**：可以分别维护 `update.staging.json` 与 `update.prod.json`。上传基准包命令（`uploadApk` / `uploadAab` / `uploadIpa` / `uploadApp`，需 `cli >= 2.16.1`）直接支持 `--config update.staging.json` 或 `--appId` 参数；执行 `pushy bundle` 前在 CI 脚本中将对应环境文件复制为 `cp update.staging.json update.json` 即可。
- **Expo Router 项目入口**：若项目使用 Expo Router 且根目录没有 `index.js`，请在仓库中保留包含 `import "expo-router/entry";` 的 `index.js` 或传入 `--expo` 参数，确保无交互打包稳定识别入口（详见 [Expo 项目指南](https://pushy.reactnative.cn/docs/expo.md)）。

## 常见问题

### 在 Linux Runner（如 `ubuntu-latest`）上能打包发布 iOS 热更新吗？

可以。`pushy bundle --platform ios` 仅运行 Metro 打包 JavaScript 与静态资源（以及调用跨平台的 Hermes 编译器生成字节码），不依赖 Xcode 或 CocoaPods。只有编译 `.ipa` 原生基准包时才需要 macOS Runner。

### 为什么 CI 日志显示打包成功，管理后台却看不到新版本或用户收不到？

请检查命令参数是否完整：非交互环境下必须传入 `--name` 才会触发上传；同时必须传入 `--packageVersionRange`、`--packageVersion` 或 `--packageId` 之一才会自动绑定到原生包。只传 `--platform` 时 CLI 仅在工作目录生成 `.ppk` 文件后退出。

### 可以为不同项目分配各自独立的 CI API Key 吗？

目前 API Key 按账号维度划分读取（`read`）、写入（`write`）、删除（`delete`）三级权限，每个账号最多可同时保有 10 个有效 API Key。建议给 CI 流水线只授予 `read` + `write` 权限（不勾选 `delete`），并为不同 CI 平台分别创建命名清晰的密钥以便随时独立轮换与撤销。

### 从 App Center CodePush 的 CI 脚本迁移过来需要改哪些命令？

只需把原有的 `appcenter codepush release-react -a owner/app -d Production -t ">=1.0.0 <2.0.0" -r 10` 替换为 `pushy bundle --platform <ios|android> --name "..." --packageVersionRange ">=1.0.0 <2.0.0" --rollout 10`，并将鉴权环境变量替换为 `PUSHY_API_TOKEN`。完整命令对照表参见[从 CodePush 迁移](https://pushy.reactnative.cn/docs/migrate-from-codepush.md)。
