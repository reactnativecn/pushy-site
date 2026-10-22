---
title: 更新日志
description: react-native-update（Pushy 热更新 React Native SDK）版本更新日志：新功能、行为变更、问题修复与升级注意事项，最新版本 v10.62.1。
type: 其他
---

# 更新日志

本页由 [GitHub Releases](https://github.com/reactnativecn/react-native-update/releases) 自动生成，列出最近的 19 个版本。更早的版本请查看 GitHub Releases。

升级原生依赖后需要重新打包并上传原生包，参见[发布热更新](/docs/publish)。

## v10.62.1

发布于 2026-10-19

### 发布类型声明，不再发布 TS 源码

包里现在附带编译好的类型声明（`lib/typescript/*.d.ts`），`package.json` 的 `types` 指向它，不再指向 `src/index.ts`。应用跑 `tsc --noEmit` 时不会再检查本包源码：`skipLibCheck` 重新生效，应用自己的编译选项（如 `noUnusedLocals`）和 React Native 类型版本的差异，都不会再在 `react-native-update` 里报错。

### 修复

- 在 React Native 0.88 类型、开启 `noUnusedLocals` 的情况下，10.62.0 会让应用的 `tsc` 报两个错误：`src/client.ts` 的 TS6133（未使用的私有 `emitError`）和 `src/clientDownload.ts` 的 TS2349（对事件发射器的联合类型调用 `addListener`）。两处均已修复，运行时行为不变。

本次仅涉及 JS，无需重新编译原生代码。

[完整变更](https://github.com/reactnativecn/react-native-update/compare/v10.62.0...v10.62.1)

## v10.62.0

发布于 2026-10-18

### 三端统一的落盘格式

Android、iOS、鸿蒙现在用同一种格式保存更新状态：两个存储 `pushy_state` 和 `pushy_cache`（Android 是 SharedPreferences 文件，iOS 是 `NSUserDefaults` suite，鸿蒙是 preferences 文件），三端键名相同，值一律是字符串，并带有 `schemaVersion`。这是原生版本，需要重新构建应用，iOS 请执行 `pod install`。

新二进制第一次启动时会一次性迁移旧格式：

- **保留**：uuid（灰度分桶保持不变）、原生配置、流程中断标记、bundle 摘要缓存和二进制身份。
- **丢弃**：热更状态、版本元信息、首次加载标记和响应缓存。release 构建每次都会写入新的构建时间，这次启动本来就会被判为二进制升级并清掉这些内容；应用从内置包启动，与任何一次应用升级相同。debug 构建（构建时间固定为 `"0"`）也会回到内置包一次。
- **可以中断**：迁移在任何一步被杀，下次启动都会继续完成。迁移无法执行时，应用按全新安装启动但保留 uuid，下次启动再重试迁移。
- **旧键会删除**：新存储写好后才删旧键，只删本 SDK 写过的键。

### 行为变化

- **降级**到旧二进制（侧载、`adb install -d`、企业分发；应用市场不允许降级）时，旧二进制会表现为全新安装：没有热更版本，JS 运行前没有原生配置，uuid 重新生成，所以降级期间灰度分桶会变。再升级回来时，uuid 恢复为降级前的值。
- **iOS** 把更新状态放在独立的 `pushy_state` / `pushy_cache` suite 里，不再写 `standardUserDefaults`。清空应用的 defaults 域（常见于退出登录）不会再抹掉 uuid 和热更状态，SDK 也不再与宿主的键（比如无前缀的 `packageVersion`）冲突。现有的隐私清单条目（`CA92.1`）照样覆盖。

### 接入方须知

- 如果代码直接读取过 SDK 的键（Android 的 `update` SharedPreferences 文件、iOS 的 `standardUserDefaults`、鸿蒙的 `update` preferences），升级后将读不到：这些键已被删除，它们也从来不是公开接口。
- 存储格式与迁移规则见 [docs/STORED_STATE_LAYOUT.md](https://github.com/reactnativecn/react-native-update/blob/master/docs/STORED_STATE_LAYOUT.md)。
- iOS 示例工程（`Example/e2etest`、`Example/testHotUpdate`、`Example/expoUsePushy`）改用 UIScene 生命周期，用 iOS 27 SDK 构建的应用需要它才能在 iOS 27 上启动。Expo 示例使用 Expo 自带的 `EXExpoAppSceneDelegate`（需 Expo 57.0.23 及以上）。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.61.0...v10.62.0)

## v10.61.0

发布于 2026-10-17

### 原生更新流程只用一个引擎

原生冷启动流程（不依赖 JS、用来救回变砖设备的检查）在 Android、iOS、鸿蒙上改由同一个 C++ 引擎驱动，不再是三份手写的循环。此前规则已经共用，现在连执行顺序也共用，并由回放的事件轨迹锁定。这是原生版本，需要重新构建应用，iOS 请执行 `pod install`。

原来三端不一致的地方，现在行为相同：

- **请求超时**：流程中的每个请求都是空闲 10 秒、整次 15 秒的上限，并受整轮截止时间约束。
- **配置变更**：结果输给配置变更的流程，统一以 `cancelled` / `config_changed` 结束。
- **断点续传**：续传的判断（sidecar 校验、`Range` / `If-Range`、响应处理、`Content-Range` 解析）也改为共用。下载完成后三端都会用最终大小刷新 sidecar（此前只有鸿蒙这样做），进程如果死在下载完成之后、解压之前，不会再把总长未知的归档整包重下。sidecar 上限为 64 KB，`Content-Range` 只接受纯数字。
- **持久化项**：二进制升级和 reset 到内置包时，三端删除同样的内容（版本信息、首次加载标记、响应缓存），保留同样的内容（uuid、原生配置、流程中断标记、bundle 摘要缓存）。不迁移任何已落盘的数据。

### 行为变化

- **JS `client.checkUpdate()`** 返回按本设备解析后的结果（依据它的灰度分桶和正在运行的版本），与 provider 一直呈现的一致。返回对象里不再有 `expVersion`。直接调用 `client.checkUpdate()` 再 `client.downloadUpdate()` 的应用，现在会遵守灰度比例，而不是装上根版本。
- **JS `useUpdate().switchVersion()` / `switchVersionLater()` 不带参数时**，切换到已下载的版本。以前用的是最近一次检查到的版本：下载完成后如果又检查到更新的版本，「立即更新」会变成没有任何提示的空操作。
- **iOS `resetToPackagedBundle`** 在 reset 状态落盘后就返回，已下载的版本在后台删除，与 Android、鸿蒙一致。`RESET_FAILED` 现在只表示 reset 状态没能落盘。
- **Android**：二进制升级和 reset 不再清掉 uuid 与原生配置。以前每次应用升级都会重新洗牌灰度分桶，原生检查和崩溃救援在 JS 再次运行前也没有配置可用。
- **JS 端点回退**：一次检查最多发 8 个端点请求，与原生流程的上限相同。以前远程端点列表可能让一次失败的检查把每个条目都请求一遍。

### 新增

- **Android 与鸿蒙的 `prepareBundle` 可以设置超时**：`PushyRuntime.prepareBundle(context, timeoutMillis, callback)` 和 `PushyFileJSBundleProvider.prepareBundle(timeoutMs)`，iOS 此前已有。超时返回 `failed` / `timeout`，流程继续在后台运行。不传超时时，Android 现在最多等 30 分钟（与 iOS 默认值相同），并发调用者也不再互相排队。

### 修复

- iOS：原生流程和崩溃救援在激活版本前会校验 bundle 摘要（`CheckActivation`），与 `switchVersion` 和其他两端一致。
- iOS 与鸿蒙：共享内核抛出的 C++ 异常会在 iOS 入口和鸿蒙 NAPI 回调处被捕获，不再穿透到运行时。启动状态无法解析时，iOS 回退到内置包。
- 鸿蒙：激活与破坏性清理不会再相互竞争（以前清理可能删掉刚校验过的版本）；`switchVersion` 会复查校验期间是否发生过 reset。
- 鸿蒙：磁盘空间不足和归档超限，在下载阶段报 `DOWNLOAD_FAILED`，在解压阶段报 `PATCH_FAILED`，与 Android、iOS 一致，换镜像判定和遥测口径因此统一。
- 鸿蒙：`meta.json` 里没有构建时间时改用应用安装时间，保留 `versionName` 的二进制升级也能被识别。下载的连接超时改为 15 秒，不再等于整个阶段的预算。
- JS：「bundle 未注册」提示里的命令按品牌显示（Cresc 显示 `cresc`）。

### 接入方须知

- npm 包只发布构建实际编译的 HDiffPatch / lzma 源码（文件数 910 → 177）。
- README 的选项表补上了 `nativeConfigSource`。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.60.0...v10.61.0)

## v10.60.0

发布于 2026-10-12

### 三端共用一份原生内核

原生更新流程（不依赖 JS 的冷启动检查）、补丁清单解析、安装记录和归档限额，过去在 Android、iOS、鸿蒙上各写一份，现在都只在共享 C++ 内核里实现一次，三端规则保持一致。公开 API、服务端路径、配置项和持久化状态都没有变化。这是原生版本，需要重新构建应用。

原来三端不一致的地方，现在统一按 JS SDK 或此前最严格的那一端处理：

- **原生配置**：`disabled` 按 JS 的真值规则判断（`1`、`"true"` 都会关闭原生检查；原来 Android 只认 `true`/`"true"`）。`appKey` 按 JS 的空白规则去除首尾空白；配置文本后面带多余内容时直接判为无效。
- **原生流程的下载**：补丁下载成功但无法应用（`PATCH_FAILED`）时，不再逐个镜像重新下载，而是和 JS 一样直接换下一个策略。
- **仅 https**：配置的端点全部是 https 时，Android 和 iOS 现在也会忽略 `queryUrls` 列表里的非 https 端点和 `http://` 下载地址，与鸿蒙一致。
- **`__diff.json`**：三端共用一个解析器。字段类型错误、`copiesCrc` 不是整数或相互矛盾、`hbcTransform` 不是对象等畸形清单，现在会让补丁失败并回退到全量包，不再被强转或静默忽略。
- **安装记录**：三端统一原子写入（临时文件、fsync、rename、目录 fsync）。缺少 `bundleSha256` 的 schema 1 记录不再被信任；记录在 current/last 中的版本激活前也会校验；计算 bundle 摘要失败会让安装失败。
- **归档限额**：三端执行同一套检查：单条和整包都按精确的 100:1 压缩比限制，拒绝符号链接，任意层级的 `.pushy-` 保留名都拒绝。

### 修复

- iOS：使用 `use_frameworks!` 时找不到 `hpatch.h`、编译失败的问题。
- iOS 15.4 以下（JSC）：复用原生检查缓存时因 `Object.hasOwn` 抛错而被静默跳过的问题。
- Android：原生传给 Java 的字符串遇到 BMP 以外的字符（如路径中的 emoji）时出错的问题。
- 遥测：下载被后续策略救回时，不再把其间的网络错误上报为 `patch_fail`。
- JS：收紧原生配置同步、检查缓存复用和下载重试（每个策略只做一次镜像测速，失败的优选镜像会被降级）。

### 接入方须知

- Android：新旧架构的模块已合并为同一个 `UpdateModule`，应用侧无需改动。库代码使用 Java 8 lambda，已显式设置 `compileOptions`，兼容较老的 Android Gradle Plugin。
- iOS：`RCTPushy.mm` 拆成了多个文件，podspec 会自动包含。升级后请执行 `pod install`。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.59.2...v10.60.0)

## v10.59.2

发布于 2026-10-03

### Android：应用内 APK 安装恢复可用

- 修复 10.53.0 起 `downloadAndInstallApk` 在所有 Android 版本上都会失败的问题。APK 能正常下载完成，但安装阶段会以 `APK_INSTALL_FAILED: Unable to stage APK installation` 失败，系统安装界面不出现。原因是安装时在 APK 写入流尚未关闭时就提交了 `PackageInstaller` 会话，系统会拒绝提交（`SecurityException: Files still open`）并放弃该会话。现在先关闭写入流，再提交会话。
- 受影响版本：10.53.0 至 10.59.1（APK 安装改用 `PackageInstaller` 之后的版本）。10.52.x 及更早版本用的是旧的安装方式，不受影响。iOS 和鸿蒙不受影响。
- 这是原生改动：需要用 10.59.2 重新构建 Android 应用，并通过应用商店或直装渠道发布。JS 热更新无法修复已安装的应用，所以已经装了受影响版本的用户需要通过其他途径（应用商店、官网下载等）安装一次修复后的版本，此后应用内 APK 更新即可正常使用。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.59.1...v10.59.2)

## v10.59.1

发布于 2026-09-29

### 原生内部整理

没有接口或行为变化。JS SDK、JS 桥接、原生宿主接口（`configure` / `prepareBundle`）、服务端请求和持久化状态均不变。

- Android：native 方法改为在库加载时注册，原生库对外只导出一个入口，不再每个方法一个符号。库文件由 `librnupdate.so` 改名为 `librnpushy.so`；如果你的 `packagingOptions` / `jniLibs` 配置里写了 `librnupdate.so`，请同步修改。
- iOS：共用的 C/C++ 核心拆为独立的 `Core` subspec，并隐藏符号可见性，以动态 framework 集成时不再导出核心内部符号。按正常原生升级流程重新运行 `pod install`。
- 三端：内部类名、方法名和日志措辞统一；内置服务地址和协议常量不再以明文字符串存放在二进制中。
- 需要重新构建原生应用才会生效；这些改动与 JS 热更新无关。

### Android：pnpm workspace 下的 Expo 检测

- 解析 `expo` 声明版本时跳过 pnpm 协议写法（`catalog:`、`workspace:`、`link:`、`file:`、git 地址）。此前名为 `catalog:v2` 之类的 catalog 会被误读成 Expo SDK 2，导致 Expo 模块被静默禁用。`npm:` 别名按最后一个 `@` 之后的部分解析。
- 用 Node 兜底解析 Expo 版本的逻辑在 Gradle 9 上恢复可用（原来用的 `Project.exec` 在 Gradle 9 中已移除，兜底会静默返回空）。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.59.0...v10.59.1)

## v10.59.0

发布于 2026-09-28

### 原生宿主接口

- 原生宿主通过 `configure` 配置 Pushy，通过 `prepareBundle` 准备下次启动使用的 bundle：
  - Android：`PushyRuntime.configure(Context, JSONObject, ConfigurationCallback)` 和 `PushyRuntime.prepareBundle(Context, Callback)`，结果类型为 `BundlePreparationResult`。
  - iOS：`+[RCTPushy configure:completion:]` 和 `+[RCTPushy prepareBundleWithCompletion:]`，Swift 对应 `configure(_:completion:)` 和 `prepareBundle(completion:)`；回调类型为 `RCTPushyConfigurationCompletion` 和 `RCTPushyBundlePreparationCompletion`。
  - HarmonyOS：`PushyFileJSBundleProvider.configure(options: PushyConfiguration)` 和 `prepareBundle(): Promise<BundlePreparationResult>`。
- 在正常解析启动 bundle 之前调用 `configure`，解析之后调用 `prepareBundle`。`prepareBundle` 不会再次解析 bundle、不会重载 React Native，也不会弹窗；选定的 bundle 从下次启动开始使用。
- 调用了这些原生接口的宿主需要同步修改调用代码并重新构建原生应用。JS SDK、JS 桥接、服务端路径、配置值、结果字段和持久化状态均不变，未调用原生宿主接口的应用正常升级即可。

完整示例见[原生配置与更新](https://pushy.react-native.cn/docs/native-api)。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.58.1...v10.59.0)

## v10.58.1

发布于 2026-09-26

### React Native 0.87 的 TypeScript 修复

- 修复在 React Native 0.87 工程中出现的 TypeScript 报错。本库以 TypeScript 源码发布，所以应用里运行 `tsc` 时也会检查本库，`skipLibCheck` 不会跳过它。10.58.0 在三处会报错：
  - `client.ts:980`（检查更新时的 `AbortSignal`）：工程同时加载了 DOM 风格的 fetch 类型（例如 `@types/bun`）时报错。
  - `client.ts` 里的 `setTimeout(resolve)`：RN 0.87 把定时器回调声明为不带参数。
  - `core.ts` 里的 `global`：RN 0.87 的类型声明里已经没有它了。
- 已用 `tsc` 在 React Native 0.87.1、react-native-tvos 0.87.1-1 和 Expo SDK 58 预览版工程中验证（模板 tsconfig、`types` 设为 `["bun"]` 或 `["jest", "node"]`、使用 DOM lib）。
- 没有运行时行为变化。只需升级 JS 包，不需要重新编译原生应用。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.58.0...v10.58.1)

## v10.58.0

发布于 2026-09-26

### 支持 tvOS 并提升 iOS 启动可靠性

- 支持 `react-native-tvos`：podspec 新增 tvOS 平台；更新包改存到 tvOS 可写的 Caches 目录；tvOS 检测到缓存被系统清理后，会在启动前重新安装并激活最新可用更新。
- 修复 iOS 和 tvOS 的延迟 purge-restore 激活竞态。启动已经选择内置包回退后，恢复任务不再把持久化的当前版本切换到另一个版本。
- 修复 Expo 在 `expo-modules-core` 嵌套安装布局下的集成问题，包括与 `react-native-tvos` 一起使用 npm 安装时的场景。
- 客户端信息将 tvOS 设备标记为 `tvos <version>`，使服务端发布分组与 iOS 保持隔离。
- 新增确定性的原生回归测试，覆盖 purge restore 顺序、超时、重置锁以及测试宿主行为。

**需要重新构建原生应用：** tvOS 支持和启动修复都属于原生变更，升级后请重新构建并分发原生应用。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.57.1...v10.58.0)

## v10.57.1

发布于 2026-09-26

### Xcode 27 编译修复（iOS）

- 修复 10.56.0～10.57.0 在 Xcode 27 下 iOS 编译失败的问题（#645）。隐私清单资源包 target（`react-native-update-react-native-update_privacy`）沿用了 podspec 写死的 `11.0` 部署版本。React Native 的 `post_install` 不会调整资源包 target，而 Xcode 27 不接受低于 iOS 15.0 的部署版本。现在改为使用 React Native 的 `min_ios_version_supported`。
- Expo 工程不受影响。本版本没有运行时改动，升级后重新执行 `pod install` 即可。
- 暂时无法升级的，可以在 Podfile 的 `post_install` 里把 `react-native-update-react-native-update_privacy` target 的 `IPHONEOS_DEPLOYMENT_TARGET` 设为 `15.1`。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.57.0...v10.57.1)

## v10.57.0

发布于 2026-09-19

### 原生配置与更新接口

- Android、iOS 和 HarmonyOS 新增供原生宿主使用的 `configure` 与 `checkAndUpdate` 接口（#641）。宿主可在 JavaScript 或 React Native bridge 启动前配置 Pushy，在应用正常解析启动 bundle 后，通过现有原生更新链路检查并下载更新。
- Android：`PushyNativeUpdate.configure(Context, JSONObject, ConfigurationCallback)` 和 `checkAndUpdate(Context, Callback)`。iOS：`+[RCTPushy configure:completion:]` 和 `+[RCTPushy checkAndUpdateWithCompletion:]`，Swift 对应 `configure(_:completion:)` 和 `checkAndUpdate(completion:)`。HarmonyOS：`PushyFileJSBundleProvider.configure(...)` 和 `checkAndUpdate()`，并导出配置与结果类型。
- 替换现有配置前校验 `appKey`、服务端地址、发现地址和激活策略；原生首次配置会生成稳定的安装标识。配置变更会使旧响应缓存和进行中的旧原生决策失效。
- 新增 JS 选项 `nativeConfigSource: 'native'`，防止 JavaScript 初始化和 `setOptions` 覆盖原生管理的配置。默认仍为 `'javascript'`，保持现有接入方式兼容；原生配置不会自动回填 JS 选项。
- 返回状态区分 `skipped`、`noUpdate`、`downloaded`、`failed` 和 `cancelled`。并发原生调用共享同一轮任务，已完成轮次复用结果。尚无配置时跳过，不再消耗本进程首次实际检查机会。

### 兼容性与接入

- **必须重新构建并分发原生安装包，不能仅通过 JS 热更新添加这些原生接口。** 从源码接入 HarmonyOS 时需重新构建 HAR；npm 包已包含更新后的 HAR。
- 配置可以在 JS 启动前完成，但检查仍需要应用正常的启动 bundle 解析。不要仅为初始化检查而再次解析 bundle。
- `afterDownload` 默认为 `none`；使用 `setNeedUpdate` 可将普通下载更新选为下次启动版本。`activated: true` 表示已选为下次启动使用的版本，不表示立即重载 React Native。原有服务端 `forceBoot` 和崩溃救援规则继续生效。
- 每进程至多执行一轮实际原生更新，包括失败轮次。重新配置会使旧结果失效，但不会增加新轮次。原生调用不展示更新弹窗，也不执行 JS 生命周期钩子。
- 三端示例与配置所有权说明见[原生配置与更新指南](https://pushy.reactnative.cn/docs/native-api)。

### 测试与示例

- 新增 38 项原生宿主与配置回归测试。合并实现已通过 lint、JS/C++ 测试、Android/iOS E2E 和 HarmonyOS 构建检查。
- 包含 v10.56.1 以来的 Expo、HarmonyOS 示例及本地 E2E 工具更新。

[完整变更记录](https://github.com/reactnativecn/react-native-update/compare/v10.56.1...v10.57.0)

## v10.56.1

发布于 2026-09-14

修复 Expo modular builds 下 iOS `ImportReact.h` 公共头文件导入问题，确保使用 modular headers 的 Expo 项目能够正常集成。

## v10.56.0

发布于 2026-09-04

本版本落地 2026-09 的安全与稳定性审计（#635、#637），覆盖 JS、Android、iOS、C++ 与鸿蒙五层。建议所有应用升级：共享的 C++ 内核加上了硬性输入上限，三端原生下载器都开始强制归档大小与磁盘余量约束，并关闭了多处状态竞态。

### 安全加固

- **路径校验与归档上限（全平台）。** manifest 与归档中的相对路径拒绝 NUL/控制字节和超过 64 层的嵌套（此前鸿蒙存在通过内嵌 NUL 逃逸 staging 目录的问题）。归档上限：压缩 512 MiB / 解压 2 GiB / 20 000 条目、单条压缩比 100:1；任意深度的符号链接与保留的 `.pushy-*` 名字一律拒绝；patch 声明的 LZMA 字典上限 128 MiB。解析 check 响应的 JSON 解析器限制输入 1 MiB、65 536 个节点。
- **磁盘空间保护（全平台）。** 下载前校验可用空间（另加 64 MiB 余量），未知长度的响应体每 8 MiB 重新探测；解压前先校验解压后总量。鸿蒙在 zlib 报不出展开量时直接拒绝归档，而不是盲目解压。
- **远程发现的端点与 APK 安装只接受 HTTPS**；iOS 的 check 请求拒绝 `https -> http` 重定向；非 2xx 的 check 响应会先截断再进入弹窗或日志。
- **JNI 边界。** 每个 JNI 入口捕获 C++ 异常并转为 Java 异常，不再穿越虚拟机栈展开。
- **Content-Range 校验。** 续传时拒绝 range 与 total 自相矛盾的 `206`（`bytes 100-199/0` 此前会被当作"总长未知"而跳过最终尺寸检查）。

### 稳定性

- **Android：** 所有"状态快照 → JNI → 提交"序列在同一把锁下执行（`switchVersion`、`markSuccess`、`rollBack`、启动解析、原生检查提交、reset）；`restartApp` 的版本切换移出 UI 线程，失败时 reject `RESTART_FAILED`，不再回退到会加载旧 bundle 的 `Activity.recreate()`；安装器在 staging rename 之后对版本根目录 fsync；清理永远不会删掉本进程启动所用的版本。
- **iOS：** `packageVersion` / `buildTime` 改存到 `REACTNATIVECN_PUSHY_*` 键下（从可能被宿主覆盖的无前缀键一次性迁移）；`use_frameworks!` 下 `buildTime` 通过 `bundleForClass:` 解析；reload 不再在监听器运行前预先消费首启状态；`restartApp` / `markSuccess` / reset 失败时分别 reject `RESTART_FAILED` / `MARK_SUCCESS_FAILED` / `RESET_FAILED`，而不是照样 resolve；空间检查前先释放已失效的 partial，全量重下不会永远卡在自己占用的空间上。
- **鸿蒙：** 所有返回 Promise 的方法都按异步注册，拒绝能真正到达 JS；持久化会等待真实的 preferences flush；归档与 bundle 的 SHA-256 在 NAPI 工作线程计算，不再阻塞 UI；下载超时受剩余 deadline 约束；所有错误携带稳定错误码（`ErrorCodes.ts` 镜像 C++ 头文件）。
- **JS：** `setOptions` 不再重复触发检查、重置自动 markSuccess 计时器或重复订阅 AppState；`setOptions({ locale })` 运行时即时生效；以不可重试错误码失败的策略不会在重试时再次执行；`switchVersion` 返回布尔值，reload 未真正重启时看门狗会清掉 `applyingUpdate`；web 构建不再每次加载都上报一次假的 rollback；运行中版本没有记录时 `getCurrentVersionInfo()` 返回 `{}` 而不是 reject。

### 需要留意的行为变化

- **iOS 隐私清单。** `ios/PrivacyInfo.xcprivacy` 随 pod 一起发布，声明了 SDK 使用的 required-reason API（磁盘空间、文件时间戳、系统启动时间、UserDefaults）以及 release 构建默认发往 `/report` 的数据：崩溃数据（JS 异常上报，`disableErrorReporting` 可关）与其他诊断数据（生命周期事件，`disableTelemetry` 可关）。两者均不关联用户身份、不用于追踪。请据此核对 App Store 的隐私问卷。
- **Android 旧架构桥：** `setNeedUpdate`、`markSuccess`、`setUuid`、`setLocalHashInfo` 现与新架构一样接收 Promise，持久化失败会 reject 而不是被吞掉。
- **Android ProGuard 规则**由对 `com.facebook.react.**` 的整体 `-keepnames` 收窄为精确的 JNI 结果类、native 方法与反射目标，并已在 RN 0.85 新架构、开启 R8 混淆的 release 构建上验证（所有 keep 的类、字段、native 方法与反射目标均在，含 `ReactHost.reload`）。若你的应用曾为本模块额外添加过 keep 规则，现在不再需要。
- **Android `build.gradle`：** 根工程未设置时的默认 `compileSdkVersion` / `targetSdkVersion` 由 31/27 提升到 34；Expo（SDK 50+）模块仅在 `expo-modules-core` 参与构建时才编译。
- **鸿蒙 HAR** 的 `oh-package.json5` 现与 npm 版本一致，且 `cpp/` 或 `android/jni/` 变更时一定会重建原生核心（此前可能发出比 Android/iOS 更旧的内核）。
- **移除：** 从未展示的 locale 字符串（`downloading_update`、`installing_update`、`update_available`、`update_downloaded`、`update_installed`、`no_update_available`、`network_error`、`download_failed`、`install_failed`、`download_speed`、`file_size`、`time_remaining`）、`react-native-url-polyfill` 依赖，以及从未触发的事件类型 / 错误码。

### 类型、文档与工具

- `ClientOptions` 及相关选项类型从包根导出；context 类型与 provider 实际提供的值一致（含 progress）。
- README（中英）新增覆盖全部 `ClientOptions` 字段的选项索引表。
- `CODE_AUDIT.md` 记录了全部发现项、严重级别与处理状态。
- CI：鸿蒙 HAR 在每个 PR 上编译并做类型检查；`patch_core` 在 ASan/UBSan 下运行并附带有界的 libFuzzer；原生 spec 一致性检查守住四端绑定；C++ 常量与 Java/ArkTS 镜像自动比对。

## v10.55.1

发布于 2026-08-31

### 问题修复

- **iOS:新架构下 `use_frameworks!` 构建的应用,`switchVersion` / `restartApp` 不会触发重启。** 重启路径此前用引号形式的 `__has_include` 探测 `RCTReloadCommand.h`,该形式只在静态链接构建下可解析;在 `use_frameworks!`(混编应用常因 Swift pod 被迫开启动态框架)下探测失败,编入的兜底 `[self.bridge reload]` 在 bridgeless 模式下是静默空操作——`switchVersion` 正常 resolve 但应用不会重载,更新只能在用户手动杀掉进程重开后生效。现探测失败时回退到 `<React/RCTReloadCommand.h>`,两种构建方式均会触发 `RCTTriggerReloadCommandListeners`。(89c638e)
- **开发环境:无内容可下载时不再伪造下载成功。** 开发环境下,当检查结果中没有全量包 URL 时,`downloadUpdate` 此前会在未安装任何内容的情况下上报 `downloadSuccess` 并返回目标 hash,引导业务代码调用 `switchVersion`,进而报 `SWITCH_VERSION_FAILED: Bundle version … not found.`。现改为打印开发环境提示并返回 `undefined`,下游不会再把这次空操作当成真实更新。(9ad95fb)

建议所有使用 `use_frameworks!` 构建的 iOS 应用升级——受影响的集成方式下,此前热更新只能在手动重启应用后生效。

## v10.55.0

发布于 2026-08-31

- 默认开启 JavaScript 未捕获错误上报，并关联当前热更版本。
- 新增 `captureException` 手动上报和 `disableErrorReporting` 显式退出。
- 上报尽力而为，保留并链式调用 Sentry、Crashlytics 等既有全局处理器。

## v10.54.0

发布于 2026-08-30

本版本集中完成安全加固（CODE_AUDIT §13）：禁止 HTTPS→HTTP 降级；采用两阶段安装并在完成记录中携带摘要；按 fingerprint 隔离检查去重；支持多镜像下载回退；以事务方式持久化状态；限制归档资源用量并严格校验检查响应 schema；同时新增 `markJsCheckCompleted`、`autoMarkSuccessDelayMs` / `healthCheck` / `testChannel` 选项、`getUpdateMetadata` 及 Sentry/Crashlytics 辅助方法、嵌套的 `checkUpdate` extra 数据和 `currentBundleSha256`。此外移除了 Expo postinstall 脚本，并通过白名单限制 npm 包中发布的文件。

## v10.53.1

发布于 2026-08-20

针对 [10.53.0](https://github.com/reactnativecn/react-native-update/releases/tag/v10.53.0) `PackageInstaller` 迁移的加固版本。正常路径行为不变,无 API 变更。

## v10.52.3

发布于 2026-08-15

`v10.52.2` 虽已创建 tag，但从未发布到 npm——其发布流程在 `prepack` 阶段失败，因此 **`v10.52.3` 取代该版本**并包含其全部内容。此前 npm 上的最新版本为 `v10.52.1`。

### 修复 React Native 0.87+ 类型错误

本包会发布 TypeScript 源码，因此每个使用方项目都会使用 React Native 自身的类型定义对其进行类型检查。React Native 0.87 生成的新类型（`types_generated/`，在 `moduleResolution: "bundler"` 下使用）使以下三处代码无法通过检查：

- `NativeEventEmitter` / `DeviceEventEmitter` 现在是泛型，并将监听器定义为 `(...args: readonly Object[]) => unknown`，因此 `(data: ProgressData) => void` 回调无法直接赋值。下载进度监听器现在会接收原始事件，并在内部收窄类型。
- `PermissionsAndroidStatic` 不再导出；Web/非原生 shim 改为从导出的值推导类型（`typeof PermissionsAndroid`）。
- `Linking.getInitialURL()` 的返回类型扩大为 `string | null | undefined`，因此 `parseLinking` 现在接受可选 URL。

以上三处写法均已在 React Native 0.73 与 0.87 的类型定义下验证通过，因此最低 React Native 版本不变。

### Pushy：新增 API 端点

Pushy preset 的主要端点新增 `1-4.rnupdate.online`，与 `update.react-native.cn` 和 `update.reactnative.cn` 一同使用。

本版本不包含 Android、iOS 或 HarmonyOS 原生代码变更。

## v10.52.2

发布于 2026-08-13

为 Pushy preset 新增更多 API 端点。

> **注意：** 此 tag 的发布流程在 `prepack` 阶段失败，因此从未发布到 npm。它已由包含其全部变更的 [`v10.52.3`](https://github.com/reactnativecn/react-native-update/releases/tag/v10.52.3) 取代。
