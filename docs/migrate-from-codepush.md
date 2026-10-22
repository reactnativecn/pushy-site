> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# 从 CodePush 迁移到 Pushy

本文面向正在使用 `react-native-code-push`（Microsoft CodePush）的 React Native 项目，说明如何把热更新迁移到 Pushy（npm 包名 `react-native-update`）：先对照两边的概念、API 和命令，再按步骤替换依赖与原生配置、发布第一个热更新，最后说明迁移期间需要注意的事项。

:::tip 推荐做法
如果你使用支持 Skills 的 AI 编程工具，可以先[安装 react-native-update Skill](https://pushy.reactnative.cn/docs/skills.md)，再让 AI 按本文的清单移除 CodePush 并完成 Pushy 接入，然后对照本文逐项校对改动。
:::

## 背景：CodePush 已随 App Center 退役

根据微软官方的 [App Center 退役公告](https://learn.microsoft.com/en-us/appcenter/retirement)，Visual Studio App Center 已于 **2025 年 3 月 31 日**退役，此后无法再登录账号或调用其 API。CodePush 托管服务随之停止；仅 Analytics 与 Diagnostics 两项功能获得了延期支持，与热更新无关。

对于 CodePush，微软给出的后续方案是一个可独立于 App Center 运行的版本 [microsoft/code-push-server](https://github.com/microsoft/code-push-server)，需要自行部署和运维。该仓库与客户端仓库 [microsoft/react-native-code-push](https://github.com/microsoft/react-native-code-push) 均已于 2025 年 5 月归档为只读，code-push-server 的说明中写明微软不为其提供支持服务。

因此，原本使用托管版 CodePush 的团队通常有两个选择：自建并长期维护 code-push-server，或者迁移到仍在持续维护的托管热更新服务。如果你选择后者，Pushy 提供以下能力，可以覆盖 CodePush 的常用场景：

- 下发增量补丁（bsdiff/hdiff，并针对 Hermes 字节码做了专项优化），而不是完整 bundle，详见[产品简介](https://pushy.reactnative.cn/docs/intro.md)；
- 新版本启动崩溃自动回滚，后台支持按比例[灰度发布](https://pushy.reactnative.cn/docs/publish.md#%E7%81%B0%E5%BA%A6%E5%8F%91%E5%B8%83)和版本健康度统计；
- 支持 iOS、Android 和鸿蒙（HarmonyOS），兼容 Expo、Hermes 与新架构；
- 客户端 SDK 与命令行工具开源，有免费版，配额见[价格页](https://pushy.reactnative.cn/pricing.md)。

## 概念对照

### 发布模型

CodePush 和 Pushy 最大的区别在于「热更新与原生包如何关联」：

- **CodePush**：每次 `release-react` 会把 bundle 发布到某个 deployment（如 `Staging`、`Production`），并按 `targetBinaryVersion` 匹配客户端的原生版本号。
- **Pushy**：先把编译好的原生包（ipa/apk/aab/app）上传到服务器作为**原生基准版本**，再把热更新版本**绑定**到一个或多个原生基准版本上。服务器以原生包内置的 bundle 为基准计算增量补丁，客户端只下载差异部分。

所以迁移后多了一个「上传原生包」的步骤，而且**上架分发的安装包必须和上传到 Pushy 的那一份完全一致**（服务器会比对编译时间戳），否则无法获取热更新，原因见[发布热更新](https://pushy.reactnative.cn/docs/publish.md)中「为什么重新打包后要先上传」一节。

| CodePush                                        | Pushy                                             | 说明                                                                     |
| ----------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| App（通常 iOS、Android 各建一个）                        | 应用（iOS、Android、鸿蒙分别创建）                            | 用 `pushy createApp` 或 `pushy selectApp` 创建/选择，信息写入项目根目录的 `update.json` |
| Deployment Key（写在 `Info.plist` / `strings.xml`） | `appKey`（写在 `update.json`，在 JS 中传给 `new Pushy()`） | Pushy 不需要在原生工程里配置 key                                                  |
| Deployment（`Staging` / `Production`）            | 无 deployment 概念                                   | 测试用扫码/Deep Link 直接安装任意热更版本，线上用灰度控制范围，见下文                               |
| Release（`v1`、`v2` 等 label）                      | 热更新版本（ppk 文件，含名称、描述和元信息）                          | 由 `pushy bundle` 生成并发布                                                 |
| `targetBinaryVersion`                           | 绑定的原生包版本（`packageVersion`）                        | 可按单个版本、最低/最高版本或 semver 范围绑定                                            |
| `--rollout` 百分比                                 | 灰度比例（`rollout`，1–100）                             | 同一原生包可同时有一个灰度版本和一个全量版本                                                 |
| `--mandatory` 强制更新                              | 元信息（`metaInfo`）+ 自定义逻辑，或 `updateStrategy`         | Pushy 没有内置的「强制」标记，见[注意事项](#强制更新)                                       |
| `rollback` / `promote`                          | 在管理后台或用 `pushy update` 重新绑定版本                     | 见[回滚](#回滚)                                                             |

### 命令行

App Center CLI（`appcenter codepush ...`）已随服务停用，下表 CodePush 一列以微软 code-push-server 自带的 CLI（命令名 `code-push-standalone`）为准。Pushy 的命令来自 `react-native-update-cli`，完整参数见[命令行工具](https://pushy.reactnative.cn/docs/cli.md)。

| 用途          | CodePush（code-push-standalone）                     | Pushy                                                                                  |
| ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 登录          | `login`                                            | `pushy login`                                                                          |
| 创建应用        | `app add <appName>`                                | `pushy createApp --platform ios`                                                       |
| 查看应用 / key  | `deployment ls <appName> -k`                       | `pushy apps`、`pushy selectApp`（或在网页管理端查看 appKey）                                       |
| 上传原生基准包     | 无此步骤                                               | `pushy uploadIpa`、`pushy uploadApk`、`pushy uploadAab`、`pushy uploadApp`                |
| 打包并发布热更新    | `release-react <appName> <platform> -d Production` | `pushy bundle --platform <ios/android/harmony>`                                        |
| 发布时指定目标原生版本 | `--targetBinaryVersion`                            | `--packageVersion`、`--minPackageVersion`、`--maxPackageVersion`、`--packageVersionRange` |
| 发布已打好的包     | —                                                  | `pushy publish <ppk 文件>`                                                               |
| 调整灰度比例      | `patch <appName> <deploymentName> --rollout 50`    | `pushy update --versionId <id> --packageVersion <版本> --rollout 50`                     |
| 回滚到上一版      | `rollback <appName> <deploymentName>`              | 把原生包重新绑定到之前的热更版本（管理后台拖拽，或 `pushy update`）                                              |
| 查看历史版本      | `deployment history`                               | `pushy versions`、`pushy packages`                                                      |

### 客户端 API

| CodePush                                                                      | Pushy                                                                                                        | 说明                                                                  |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `codePush(options)(App)` 高阶组件                                                 | `new Pushy({ appKey, ... })` + `<UpdateProvider client={pushyClient}>`                                       | 见[代码集成](https://pushy.reactnative.cn/docs/integration.md)           |
| `checkFrequency: ON_APP_START`（默认）                                            | `checkStrategy: "onAppStart"`                                                                                | Pushy 默认值是 `"both"`（启动和回到前台都检查）                                     |
| `checkFrequency: ON_APP_RESUME`                                               | `checkStrategy: "onAppResume"`                                                                               |                                                                     |
| `checkFrequency: MANUAL`                                                      | `checkStrategy: null`，再手动调用 `checkUpdate()`                                                                  | `null` 需 v10.4.2+                                                   |
| `installMode: IMMEDIATE`                                                      | `updateStrategy: "silentAndNow"`，或手动调用 `switchVersion()`                                                     | 下载后立即重启应用                                                           |
| `installMode: ON_NEXT_RESTART`（默认）                                            | `updateStrategy: "silentAndLater"`，或手动调用 `switchVersionLater()`                                              | 下次冷启动时生效                                                            |
| `installMode: ON_NEXT_RESUME` / `ON_NEXT_SUSPEND`、`minimumBackgroundDuration` | 无直接对应                                                                                                        | 如有需要，可在 `updateStrategy: null` 下自行监听 AppState 并调用 `switchVersion()` |
| `updateDialog`                                                                | `updateStrategy: "alertUpdateAndIgnoreError"`（生产环境默认）                                                        | 用系统 alert 提示；完全自定义界面用 `updateStrategy: null` + `useUpdate()`        |
| `codePush.sync()`                                                             | `checkUpdate()` → `downloadUpdate()` → `switchVersion()` / `switchVersionLater()`                            | 均可从 `useUpdate()` 中取得                                               |
| `codePush.checkForUpdate()`                                                   | `checkUpdate()`，结果读 `useUpdate()` 的 `updateInfo`                                                             |                                                                     |
| `codePush.notifyAppReady()`                                                   | 无需调用（`autoMarkSuccess` 默认开启）；手动时用 `markSuccess()`                                                            | 一般不建议手动标记                                                           |
| `codePush.getUpdateMetadata()`                                                | `currentVersionInfo`（v10.31.2+）                                                                              | 返回当前热更版本的 `name`、`description`、`metaInfo`                           |
| `codePush.restartApp()`                                                       | `restartApp()`（v10.28.2+）                                                                                    |                                                                     |
| `codePush.disallowRestart()` / `allowRestart()`                               | `beforeReload` 回调返回 `false` 可取消一次重启（v10.42.2+）                                                               | 语义不完全相同，请按需评估                                                       |
| `codePush.clearUpdates()`                                                     | `resetToPackagedBundle()`（v10.48.0+）                                                                         | 清空热更状态，回到安装包内置 bundle                                               |
| `rollbackRetryOptions`                                                        | 无直接对应                                                                                                        | Pushy 不会自动重装已回滚过的版本                                                 |
| `SyncStatus` 回调                                                               | `logger` 事件（`checking`、`downloading`、`downloadSuccess`、`rollback` 等）与 `useUpdate()` 的 `progress`、`lastError` | 见[API 参考](https://pushy.reactnative.cn/docs/api.md)                 |

## 迁移步骤

下面的步骤以「已有一个接入了 CodePush 的 React Native 工程」为起点。迁移需要发布新的原生包，建议在一个新的原生版本号上完成。


### 移除 react-native-code-push
在项目根目录卸载依赖：
```bash
npm uninstall react-native-code-push
```
然后清理原生侧的 CodePush 配置。CodePush 的接入方式随 RN 版本和项目历史有所不同，请以你项目里实际存在的内容为准，逐项检查：
**iOS**
- `AppDelegate`（或你的 `bundleURL` 所在文件）中的 `#import <CodePush/CodePush.h>`，以及 `return [CodePush bundleURL];`（Swift 项目中为对应的 `CodePush.bundleURL()` 调用）。下一步会把它替换为 Pushy 的写法。
- `Info.plist` 中的 `CodePushDeploymentKey`，以及可能存在的 `CodePushServerURL`（自建 code-push-server 时使用）、`CodePushPublicKey`（代码签名时使用）。
- 如果是 RN 0.60 以下手动在 `Podfile` 中添加过 `pod 'CodePush', ...`，一并删除。修改后在 `ios` 目录重新执行 `pod install`。
**Android**
- `android/app/build.gradle` 中的 `apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"`。
- `android/settings.gradle` 中手动添加过的 `include ':react-native-code-push'` 和对应的 `projectDir` 配置（RN 0.60 以上的自动链接项目一般没有）。
- `MainApplication` 中的 `import com.microsoft.codepush.react.CodePush` 和返回 `CodePush.getJSBundleFile()` 的 `getJSBundleFile` 覆盖。
- `res/values/strings.xml` 中的 `CodePushDeploymentKey`，以及可能存在的 `CodePushServerUrl`、`CodePushPublicKey`。
**JS**
- 删除所有 `import codePush from "react-native-code-push"`，以及根组件外的 `codePush(...)(App)` 包裹和 `codePush.sync()` 调用。下文会用 Pushy 的写法替换。
:::warning
不要让 CodePush 和 Pushy 同时生效。两者都通过接管 `bundleURL` / `getJSBundleFile` 来加载热更新 bundle，同时保留会导致加载哪个 bundle 不可预期。
:::
### 安装 react-native-update 并完成原生配置
按[安装配置](https://pushy.reactnative.cn/docs/getting-started.md)安装命令行工具和 `react-native-update`，并完成各平台的原生配置。对于 CodePush 迁移来说，关键是把上一步删掉的 bundle 入口换成 Pushy 的：
```bash
npm i -g react-native-update-cli
npm i react-native-update
cd ios && pod install
```
iOS（Objective-C 示例；Swift、RN 0.88 起的 `SceneDelegate` 写法见[配置 Bundle URL](https://pushy.reactnative.cn/docs/getting-started.md#%E9%85%8D%E7%BD%AE-bundle-url)）：
```diff
-#import <CodePush/CodePush.h>
+#import "RCTPushy.h"

 - (NSURL *)bundleURL
 {
 #if DEBUG
   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
 #else
-  return [CodePush bundleURL];
+  return [RCTPushy bundleURL];
 #endif
 }
```
Android（Kotlin，RN 0.81 或以下的 `DefaultReactNativeHost` 写法；RN 0.82 起改为给 `getDefaultReactHost` 传入 `jsBundleFilePath = UpdateContext.getBundleUrl(this)`，见[配置 Bundle URL](https://pushy.reactnative.cn/docs/getting-started.md#%E9%85%8D%E7%BD%AE-bundle-url)）：
```diff
-import com.microsoft.codepush.react.CodePush
+import cn.reactnative.modules.update.UpdateContext

 // DefaultReactNativeHost 内部
-override fun getJSBundleFile(): String {
-    return CodePush.getJSBundleFile()
-}
+override fun getJSBundleFile(): String? {
+    return UpdateContext.getBundleUrl(this@MainApplication)
+}
```
同时请按安装配置页完成这几项 CodePush 没有要求、但 Pushy 需要的设置：
- Android 在 `android/app/build.gradle` 的 release 配置中[关闭 `crunchPngs`](https://pushy.reactnative.cn/docs/getting-started.md#%E7%A6%81%E7%94%A8-android-%E7%9A%84-crunch-%E4%BC%98%E5%8C%96)，否则会影响增量补丁生成；
- 使用 `react-native-screens` 时，按文档覆盖 Android `MainActivity` 的 `onCreate`，避免热更后重启白屏；
- 建议添加[测试用的 Deep Link](https://pushy.reactnative.cn/docs/getting-started.md#%E6%B7%BB%E5%8A%A0%E6%B5%8B%E8%AF%95%E7%94%A8%E7%9A%84-deep-link)，用来替代 CodePush 的 Staging deployment 做发布前测试（见下文）；
- 鸿蒙项目按文档完成 Harmony 部分的配置。
Expo 项目要求 Expo 50 或以上并通过 `npx expo prebuild` 预构建，且不要同时安装 `expo-updates`。
### 登录并创建应用
在 [Pushy 管理后台](https://pushy-admin.reactnative.cn)注册账号后，在项目根目录登录并按平台分别创建应用：
```bash
pushy login
pushy createApp --platform ios
pushy createApp --platform android
```
完成后项目根目录会生成 `update.json`，其中包含各平台的 `appId` 和 `appKey`，可以提交到 Git；登录生成的 `.update` 文件则不要提交。详见[安装配置](https://pushy.reactnative.cn/docs/getting-started.md)中的「登录与创建应用」。
### 替换 JS 代码
以一个典型的 CodePush 接入为例：
```js
// 迁移前（CodePush）
import codePush from "react-native-code-push";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

export default codePush(codePushOptions)(App);
```
对应的 Pushy 写法：
```js
// 迁移后（Pushy）
import { Platform } from "react-native";
import { Pushy, UpdateProvider } from "react-native-update";
import _updateConfig from "./update.json";

const { appKey } = _updateConfig[Platform.OS];

const pushyClient = new Pushy({
  appKey,
  checkStrategy: "onAppResume", // 对应 CheckFrequency.ON_APP_RESUME
  updateStrategy: "silentAndLater", // 静默下载，下次启动生效，对应 InstallMode.ON_NEXT_RESTART
});

export default function Root() {
  return (
    <UpdateProvider client={pushyClient}>
      <App />
    </UpdateProvider>
  );
}
```
如果原来是用 `codePush.sync()` 手动控制流程、自己画更新界面，可以设置 `updateStrategy: null`，在 `UpdateProvider` 的子组件中通过 `useUpdate()` 取得 `checkUpdate`、`downloadUpdate`、`switchVersion`、`switchVersionLater`、`updateInfo`、`progress` 等自行组合，完整示例见[代码集成](https://pushy.reactnative.cn/docs/integration.md)中的「自定义更新界面」。注意 `useUpdate()` 只能在 `UpdateProvider` 的子组件里调用。
Pushy 默认在开发环境（`__DEV__`）中不检查更新；即便打开 `debug: true`，也只能检查和下载，实际应用热更新必须在 release 包中进行。
### 打包并上传原生基准包
这是 CodePush 没有、但 Pushy 必需的一步。先**提高原生版本号**（iOS 的 `CFBundleShortVersionString`、Android 的 `versionName`），按正常流程打 release 包，然后上传：
```bash
pushy uploadIpa <ipa 文件>
pushy uploadApk android/app/build/outputs/apk/release/app-release.apk
# 如果实际分发的是 aab：
pushy uploadAab android/app/build/outputs/bundle/release/app-release.aab
```
上传后再把**同一份**安装包提交到应用商店或分发渠道。以后只要重新打原生包，都要先改版本号、再上传，最后分发。同时产出 apk 和 aab、iOS 不要重新 archive 等细节，见[发布热更新](https://pushy.reactnative.cn/docs/publish.md)。
### 发布第一个热更新
修改一处 JS 代码后执行：
```bash
pushy bundle --platform android
```
按提示发布并绑定原生包即可；也可以一条命令完成打包、发布和绑定（需 cli v1.46.1+）：
```bash
pushy bundle --platform android --name "1.0.1" --description "首个 Pushy 热更新" --packageVersion "2.0.0"
```
其中 `--packageVersion` 换成你刚上传的原生版本号，作用类似 CodePush 的 `--targetBinaryVersion`；需要一次绑定多个原生版本时可改用 `--packageVersionRange`。绑定后服务器会在几秒内生成增量补丁。
### 测试与灰度验证
CodePush 常用 `Staging` deployment 做发布前测试。在 Pushy 中，推荐用管理后台的测试二维码：配置好测试用 Deep Link 后，用系统相机扫描某个热更版本的二维码，即可在与线上用户完全一致的 release 包上安装该版本，**无需先绑定、也不影响线上用户**，详见[测试与回滚](https://pushy.reactnative.cn/docs/bestpractice.md#%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%9B%9E%E6%BB%9A)。如果应用自带扫码功能，也可以用 [`parseTestQrCode`](https://pushy.reactnative.cn/docs/api.md) 实现。
测试通过后，先以较小比例灰度发布，观察版本健康度和[数据分析](https://pushy.reactnative.cn/docs/analytics.md)，再逐步扩大到 100%：
```bash
pushy update --platform android --versionId <热更版本 id> --packageVersion "2.0.0" --rollout 10
```
灰度的工作原理和注意事项见[灰度发布](https://pushy.reactnative.cn/docs/publish.md#%E7%81%B0%E5%BA%A6%E5%8F%91%E5%B8%83)。同一原生包同时保留一个灰度版本和一个全量版本需要客户端 `react-native-update` v10.32.0+、cli v2.4.0+。

## 注意事项

### 已发出的老版本仍连着 CodePush

热更新 SDK 是编译进原生包里的，**已经安装在用户手机上的老版本仍然使用 CodePush 客户端**，无法通过热更新切换到 Pushy。只有安装了集成 Pushy 的新原生包的用户，才会从 Pushy 获取热更新。

因此迁移的实际节奏是：

1. 发布集成 Pushy 的新原生包（上一节的步骤），并通过应用商店让用户升级；
2. 在新原生包覆盖率上升之前，老版本用户无法再从托管版 CodePush 获得更新。如果你在过渡期使用了自建 code-push-server，可以继续用它维护老版本，直到老版本用户占比足够低；
3. 如果需要引导老版本用户尽快升级，可以通过你自己的业务接口或应用内提示实现。对于已接入 Pushy 的原生包，以后若再发布不兼容的新原生版本，可以在管理后台把旧原生包设为过期，客户端会收到 `expired` 结果并引导用户下载（需在后台填写下载地址），见 [API 参考](https://pushy.reactnative.cn/docs/api.md)中 `checkUpdate` 的说明。

### 回滚

- **客户端自动回滚**：CodePush 要求新版本调用 `notifyAppReady()`，否则下次启动会回滚。Pushy 默认在新版本启动后自动标记成功（`autoMarkSuccess` 默认为 `true`），新版本启动崩溃会自动回滚到上一个可用版本，一般不需要手动调用 `markSuccess()`。设备上已回滚过的版本不会被再次安装。
- **服务端回滚**：对应 CodePush 的 `rollback` 命令，Pushy 中可先在管理后台对原生包或整个应用暂停热更，再把原生包重新绑定到之前正常的热更版本（后台拖拽，或 `pushy update --versionId <旧版本 id>`），也可以回滚代码后重新发布一个修复版本，见[测试与回滚](https://pushy.reactnative.cn/docs/bestpractice.md#%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%9B%9E%E6%BB%9A)。
- **救砖**：如果某个热更版本让应用启动即崩溃、JS 已无法运行，可以对修复版本使用「强制启动（救砖）」，由原生冷启动检测把修复版本拉下来并在下次启动生效。需要原生包中的 `react-native-update` v10.52.1+，详见[发布热更新](https://pushy.reactnative.cn/docs/publish.md)中的「强制启动（救砖）」一节。CodePush 没有对应功能。

### 强制更新

CodePush 发布时可加 `--mandatory`，客户端据此跳过用户确认。Pushy 没有内置的强制标记，常见做法有两种：

- 全局采用 `updateStrategy: "silentAndNow"`，下载后立即应用；
- 在发布时填写元信息（`--metaInfo '{"mandatory": true}'`，字段名由你自定），在 `updateStrategy: null` 的自定义流程里读取 `updateInfo.metaInfo` 决定是否跳过确认、立即调用 `switchVersion()`。元信息的用法见[场景实践](https://pushy.reactnative.cn/docs/bestpractice.md)中的「元信息(Meta Info)的使用」。

注意「强制启动（救砖）」是救急用的通道，会越过客户端的更新策略，不建议当作日常的强制更新使用。

### 其他差异

- **原生包必须先上传**：重新打包而没有上传，会因编译时间戳不一致无法获取热更新，见[常见问题](https://pushy.reactnative.cn/docs/faq.md)。
- **哪些修改能热更新**：与 CodePush 相同，只有 JS 代码和 JS 中引用的图片等资源可以热更新，任何原生代码或原生依赖的变更都需要发新原生包。
- **海外合规**：如果项目对海外数据存放或运营主体有额外要求，可以考虑由独立公司实体运营的全球服务 [Cresc](https://cresc.dev/)。

## 下一步

- [安装配置](https://pushy.reactnative.cn/docs/getting-started.md)：完整的原生配置步骤
- [代码集成](https://pushy.reactnative.cn/docs/integration.md)：`UpdateProvider`、更新策略和自定义界面
- [发布热更新](https://pushy.reactnative.cn/docs/publish.md)：原生包上传、热更新发布、灰度与强制启动
- [命令行工具](https://pushy.reactnative.cn/docs/cli.md)：全部 `pushy` 命令与参数
- [常见问题](https://pushy.reactnative.cn/docs/faq.md)：遇到问题先查这里，或到 [issues 区](https://github.com/reactnativecn/react-native-update/issues)提问
