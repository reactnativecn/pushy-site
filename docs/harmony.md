> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# 鸿蒙（HarmonyOS NEXT）React Native 热更新

Pushy（npm 包 `react-native-update`）第一方支持鸿蒙：同一套 React Native 业务代码在 iOS、Android 与 HarmonyOS NEXT 上都可以通过 Pushy 下发增量热更新，命令行、管理后台、灰度发布和崩溃回滚的用法与另外两个平台一致。

本页把鸿蒙相关的内容集中在一处，按「背景 → 原生配置 → 代码集成 → 发布原生基准包 → 发布热更新 → 原生侧接口 → 常见问题」的顺序组织。各步骤的权威说明仍以[安装配置](https://pushy.reactnative.cn/docs/getting-started.md#harmony)、[代码集成](https://pushy.reactnative.cn/docs/integration.md)和[发布热更新](https://pushy.reactnative.cn/docs/publish.md#harmony)为准，本页与之保持一致，并补充鸿蒙特有的注意事项。

:::tip 推荐优先使用 Skill 自动接入
如果你使用支持 Skills 的 AI 编程工具，可以先完成[安装与使用 Skill](https://pushy.reactnative.cn/docs/skills.md)，让 AI 根据工程自动完成依赖安装和原生配置，再用本页作为校对清单。
:::

## React Native 如何运行在鸿蒙上

HarmonyOS NEXT（纯血鸿蒙）不再兼容 Android 应用，原生开发使用 ArkTS 与 ArkUI，工程由 DevEco Studio 与 hvigor 构建，第三方依赖通过 ohpm 以 `har` 包分发。React Native 官方并没有鸿蒙平台，目前的方案是 **RNOH（React Native for OpenHarmony）**：由华为与 Software Mansion 等社区力量共同开发的鸿蒙适配层。它基于 React Native 新架构（Fabric 与 TurboModule），把 React 组件映射为 ArkUI 原生组件。

一个 RNOH 工程通常由两部分依赖组成：

- **JS 侧**：npm 包 `@react-native-oh/react-native-harmony`，以及提供 `react-native bundle-harmony` 等命令的 `@react-native-oh/react-native-harmony-cli`；
- **原生侧**：`harmony/` 目录下的鸿蒙工程，依赖 ohpm 包 `@rnoh/react-native-openharmony`，在 `RNApp` 组件中通过 `jsBundleProvider` 决定从哪里加载 JS bundle。

运行时 `Platform.OS` 的值为 `'harmony'`，因此大部分业务代码可以与 iOS、Android 共用，只在必要处按平台分支。RNOH 的版本与 React Native 版本对应演进，具体支持情况请以 RNOH 官方仓库的发布说明为准。Pushy 仓库中的鸿蒙示例工程 [harmony_use_pushy](https://github.com/reactnativecn/react-native-update/tree/master/Example/harmony_use_pushy) 基于 React Native 0.82.1 与 RNOH 0.82.33，可作为参考。

### 为什么鸿蒙应用更需要热更新

鸿蒙原生包需要经过签名、打包并提交华为应用市场审核，修复一个 JS 层的问题同样要走完整的发版流程，用户还要手动升级。而 React Native 应用的业务逻辑和图片资源都在 JS bundle 中，正适合热更新：

- **修复上线快**：JS 问题修复后几分钟内即可下发，不必重新打包、审核；
- **多端同步**：同一份 JS 改动可以同时发布到 iOS、Android 与鸿蒙，避免某个平台因审核节奏不同而版本落后；
- **体积小**：Pushy 基于原生包内置的 bundle 计算增量补丁，用户只需下载改动部分；
- **风险可控**：支持灰度发布，新版本启动失败会自动回滚到上一个可用版本。

## 接入前的准备

- 一个可以正常编译运行的 RNOH 工程，鸿蒙原生工程位于项目根目录的 `harmony/` 下；
- 已全局安装命令行工具：`npm i -g react-native-update-cli`；
- 项目中已安装 `react-native-update`：`npm i react-native-update`。鸿蒙所需的 `pushy.har`、hvigor 插件与 C++ 源码都包含在这个 npm 包的 `harmony/` 目录中，不需要单独下载；
- 项目的 devDependencies 中有 `@react-native-oh/react-native-harmony-cli`，`pushy bundle --platform harmony` 会调用它提供的 `bundle-harmony` 命令；
- DevEco Studio 与 hvigor 5 或更高版本（Pushy 的 hvigor 插件需要在模块中注册构建任务，旧版本 hvigor 会直接报错）；`pushy.har` 的最低兼容 SDK 为 `5.0.0(12)`，即 API 12。

:::warning
请不要混用 `npm/yarn/pnpm` 等包管理器及对应的 lock 文件。任何在 `harmony` 目录下的修改，都需要重新编译后才能生效。
:::

## 原生配置

以下配置与[安装配置 - Harmony](https://pushy.reactnative.cn/docs/getting-started.md#harmony)一节完全相同，这里逐项说明每一步的作用。


### 编译 C++ 胶水代码
在 `harmony/entry/src/main/cpp/CMakeLists.txt` 中，`add_library(rnoh_app ...)` 之后增加：
```cmake
set(PUSHY_CPP_DIR "${NODE_MODULES}/react-native-update/harmony/pushy/src/main/cpp")
target_include_directories(rnoh_app PRIVATE "${PUSHY_CPP_DIR}")
target_sources(rnoh_app PRIVATE "${PUSHY_CPP_DIR}/PushyTurboModule.cpp")
```
Pushy 的 RNOH TurboModule 胶水代码直接编译进 `rnoh_app`，负责补丁合成的原生库则由 `pushy.har` 提供。
### 注册 C++ 侧 Package
在 `harmony/entry/src/main/cpp/PackageProvider.cpp` 中加入 `PushyPackage`：
```cpp
#include "RNOH/PackageProvider.h"
#include "PushyPackage.h"
using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
         std::make_shared<PushyPackage>(ctx)
    };
}
```
如果工程里已有其他 Package，把 `std::make_shared<PushyPackage>(ctx)` 追加到返回列表中即可。
### 添加 har 依赖
在 `harmony/entry/oh-package.json5` 中增加：
```json5
"dependencies": {
  "pushy": "file:../../node_modules/react-native-update/harmony/pushy.har",
}
```
依赖名 `pushy` 会在后面的 ArkTS 代码和 hvigor 插件中用到。如果你改成了其他名字，后续 import 路径要一并修改。
### 注册 hvigor 插件
在 `harmony/hvigor/hvigor-config.json5` 中增加：
```json5
{
  dependencies: {
    pushy: "file:../../node_modules/react-native-update/harmony",
  },
}
```
然后在 `harmony/entry/hvigorfile.ts` 中启用插件：
```ts
import {hapTasks} from '@ohos/hvigor-ohos-plugin';
import {reactNativeUpdatePlugin} from 'pushy/hvigor-plugin';

export default {
  system: hapTasks /* Built-in plugin of Hvigor. It cannot be modified. */,
  plugins: [
    reactNativeUpdatePlugin(),
  ] /* Custom plugin to extend the functionality of Hvigor. */,
};
```
这个插件在构建时向 `entry/src/main/resources/rawfile/meta.json` 写入编译时间戳 `pushy_build_time` 和 `AppScope/app.json5` 中的 `versionName`，服务端靠它们识别原生包。它只在 `assemble` 类构建（包括 DevEco 的 Build 与 Run）时执行，IDE 同步和 `clean` 不会改写该文件；**debug 构建写入的时间戳固定为 `0`**，只有 release 构建才会写入真实时间，这一点在[发布原生基准包](#发布原生基准包)时很关键。插件应放在模块级的 `entry/hvigorfile.ts` 中，而不是工程根目录的 hvigorfile。
### 注册 ArkTS 侧 Package
`harmony/entry/src/main/ets/RNPackagesFactory.ts`：
```ts
import type {
  RNPackageContext,
  RNPackage,
} from "@rnoh/react-native-openharmony/ts";
import { PushyPackage } from "pushy/ts";

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [new PushyPackage(ctx)];
}
```
已有其他 RNPackage 时同样只需追加 `new PushyPackage(ctx)`。
### 用 Pushy 加载 bundle
在 `harmony/entry/src/main/ets/pages/Index.ets` 中，把 `PushyFileJSBundleProvider` 加入 `AnyJSBundleProvider` 的列表，放在内置 bundle 的 `ResourceJSBundleProvider` 之前：
```ts
// ↓↓↓请注意不要少了这句import
import { PushyFileJSBundleProvider } from 'pushy/src/main/ets/PushyFileJSBundleProvider';
// ↑↑↑

// ... RNApp 的其他配置
jsBundleProvider: new TraceJSBundleProviderDecorator(
  new AnyJSBundleProvider([
    // MetroJSBundleProvider.fromServerIp('127.0.0.1'),
    // ↓↓↓将下面这一段添加到 AnyJSBundleProvider 内部！
    new PushyFileJSBundleProvider(this.rnohCoreContext.uiAbilityContext),

    // 注意无论是否使用 hermes 格式，请保持 bundle 文件名为 bundle.harmony.js
    new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'bundle.harmony.js')
  ]),
  this.rnohCoreContext.logger),
```
完整的 `Index.ets` 示例见[安装配置](https://pushy.reactnative.cn/docs/getting-started.md#harmony)。`AnyJSBundleProvider` 按顺序尝试：有已生效的热更新时由 `PushyFileJSBundleProvider` 加载热更新版本，否则回落到应用内置的 `bundle.harmony.js`。这也是热更新「重启后回滚」最常见的原因——如果没有正确接入这个 provider，下载的更新永远不会被加载。
内置 bundle 的文件名必须保持为 `bundle.harmony.js`：命令行工具打包、上传原生包解析内置 bundle、生成增量补丁时都按这个固定文件名匹配。

## 代码集成

JS 侧的集成与 iOS、Android 完全相同，参见[代码集成](https://pushy.reactnative.cn/docs/integration.md)。`update.json` 按平台保存 appKey，鸿蒙对应 `harmony` 字段，而 RNOH 上 `Platform.OS` 正好是 `'harmony'`，所以通用写法不需要改动：

```javascript
import { Platform } from "react-native";
import { UpdateProvider, Pushy } from "react-native-update";
import _updateConfig from "./update.json";

const { appKey } = _updateConfig[Platform.OS];

const pushyClient = new Pushy({ appKey });

export default function Root() {
  return (
    <UpdateProvider client={pushyClient}>
      <App />
    </UpdateProvider>
  );
}
```

`update.json` 中的 `harmony` 字段来自登录后创建或选择鸿蒙应用。**iOS、Android、鸿蒙需要分别创建应用**：

```bash
$ pushy login
$ pushy createApp --platform harmony
App Name: <输入应用名字>
# 或者选择已在网页端创建的应用
$ pushy selectApp --platform harmony
```

完成后 `update.json` 类似：

```json
{
  "ios": { "appId": 1, "appKey": "<一串随机字符串>" },
  "android": { "appId": 2, "appKey": "<一串随机字符串>" },
  "harmony": { "appId": 3, "appKey": "<一串随机字符串>" }
}
```

`update.json` 不含敏感信息，可以提交到 Git；登录生成的 `.update` 文件则不要提交。

## 发布原生基准包

热更新的增量补丁是基于用户设备上的原生包计算的，所以每个对外分发的鸿蒙原生包都要先上传到 Pushy 登记。流程与[发布热更新 - Harmony](https://pushy.reactnative.cn/docs/publish.md#harmony)一致：


### 生成内置 bundle
在项目根目录执行：
```bash
$ pushy bundle --platform harmony --no-interactive
```
鸿蒙平台下，命令行会调用 `react-native bundle-harmony` 打包，除生成 ppk 外，还会把 `bundle.harmony.js` 复制到 `harmony/entry/src/main/resources/rawfile/`，把图片等资源复制到同目录的 `assets/` 下（sourcemap 不会复制进去），这样接下来编译的原生包就内置了最新的 JS。`--no-interactive` 表示打包后不询问是否发布，适合只为原生包准备内置 bundle 的场景。示例工程的 `npm run build` 就是这条命令。
### 以 release 模式编译 .app
在 DevEco Studio 中通过 Build => Build Hap(s)/App(s) => Build App(s) 编译，产物位于 `harmony/build/outputs/default/harmony-default-unsigned.app`（实际文件名随工程名与签名配置变化）。
请确认构建模式为 **release**。前面提到 hvigor 插件在 debug 构建中写入的编译时间戳为 `0`，这样的包上传时会因为取不到编译时间戳而失败。
### 上传 .app
```bash
$ pushy uploadApp harmony/build/outputs/default/harmony-default-unsigned.app
```
`AppScope/app.json5` 中的 `versionName` 会被记录为原生版本号 `packageVersion`。上传前可以用 `pushy parseApp <app文件>` 查看命令行从包中解析出的版本号与编译时间戳。`.app` 内部嵌套的 hap 会被自动解析，不需要单独上传 hap。
### 分发同一个包
之后向华为应用市场提交，或用 `hdc` 安装到设备测试的，都必须是**刚才上传的这一个包**。如果修改了原生代码或配置需要重新打包，请先修改 `versionName`，再重新编译并 `uploadApp`。否则同版本号、不同编译时间戳的包会[无法获取热更新](https://pushy.reactnative.cn/docs/faq.md#%E7%83%AD%E6%9B%B4%E6%96%B0%E6%8A%A5%E9%94%99%E7%83%AD%E6%9B%B4%E6%96%B0%E5%B7%B2%E6%9A%82%E5%81%9C%E5%8E%9F%E5%9B%A0%E7%BC%96%E8%AF%91%E6%97%B6%E9%97%B4%E6%88%B3%E4%B8%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%AE%B0%E5%BD%95%E4%B8%8D%E4%B8%80%E8%87%B4)。原理可参考[为什么重新打包后要先上传](https://pushy.reactnative.cn/docs/publish.md#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%87%8D%E6%96%B0%E6%89%93%E5%8C%85%E5%90%8E%E8%A6%81%E5%85%88%E4%B8%8A%E4%BC%A0)。

## 发布热更新

原生基准包上传后，修改 JS 代码或图片资源，然后执行：

```bash
$ pushy bundle --platform harmony
```

打包完成后输入 `Y` 即可上传，再按提示输入版本名、描述和元信息，并绑定到对应的原生包。也可以用参数一次完成打包、发布和绑定：

```bash
$ pushy bundle --platform harmony --name "1.0.1" --description "修复首页问题" --packageVersion "1.0.0"
```

绑定方式还可以使用 `--packageId`、`--minPackageVersion`、`--maxPackageVersion` 或 `--packageVersionRange`，参数说明见[命令行工具](https://pushy.reactnative.cn/docs/cli.md#pushy-bundle)。已经打好的 ppk 可以稍后用 `pushy publish --platform harmony <ppk文件>` 上传，再用 `pushy update --platform harmony` 绑定；也可以在网页后台把原生包版本拖到热更新版本下。绑定后服务器会在几秒内生成增量补丁，客户端即可检查到更新。

注意，`pushy bundle --platform harmony` 每次都会覆盖 `rawfile/` 下的 `bundle.harmony.js` 和 `assets/`。这不影响已经上传的原生包，但下一次编译原生包时会内置当前的 JS，请确认这符合你的预期。

灰度发布、强制启动（救砖）等能力在鸿蒙上同样可用，参见[发布热更新](https://pushy.reactnative.cn/docs/publish.md#%E7%81%B0%E5%BA%A6%E5%8F%91%E5%B8%83)。

## 原生侧主动检查更新

除了在 JS 中检查更新，`react-native-update` v10.59.0 起提供原生宿主接口：HarmonyOS 上直接调用应用实际加载 bundle 的那个 `PushyFileJSBundleProvider` 实例的 `configure` 与 `prepareBundle`，不经过 JS Bridge：

```ts
import {
  PushyFileJSBundleProvider,
  PushyConfiguration,
  BundlePreparationResult,
} from 'pushy';

async function configurePushy(provider: PushyFileJSBundleProvider): Promise<void> {
  const options: PushyConfiguration = {
    appKey: '你的 HarmonyOS appKey',
    afterDownload: 'setNeedUpdate',
  };
  await provider.configure(options);
}

async function checkFromNative(provider: PushyFileJSBundleProvider): Promise<void> {
  const result: BundlePreparationResult = await provider.prepareBundle();
  console.info(`Pushy: ${result.status} / ${result.reason}`);
}
```

要点：

- 不要为了检查另外创建一个 provider，也不要额外调用 `getURL()` 或 `getBundle()`；
- `prepareBundle` 要在 provider 已经参与正常启动解析之后调用，否则返回 `not_initialized`（开发环境走 Metro 时也是如此）；
- 从 v10.61.0 起可以传入超时毫秒数 `prepareBundle(timeoutMs)`，超时返回 `failed / timeout`，这一轮检查仍在后台继续并作用于下次启动；不传超时则一直等到这一轮结束；
- 升级到包含这些接口的版本后，必须重新编译并上传鸿蒙原生包，不能只发 JS 热更新。

配置字段、返回值含义以及 JS 与原生谁来管理配置，详见[原生主动检测与更新](https://pushy.reactnative.cn/docs/native-api.md#harmonyosarkts)。

## 常见问题

### iOS、Android 和鸿蒙可以共用一套 JS 代码吗？

可以。业务代码只需维护一份，但**发布时需要按平台分别打包**：`pushy bundle --platform ios`、`--platform android`、`--platform harmony` 各自生成并上传到对应平台的应用，并分别绑定各平台的原生包。三个平台在 Pushy 中是三个独立应用，appKey、原生包版本和热更新版本互不影响。代码中使用了仅某个平台存在的原生模块时，请用 `Platform.OS` 做分支。

### 哪些改动可以通过热更新发布到鸿蒙？

与其他平台的规则相同（见[哪些修改可以热更新](https://pushy.reactnative.cn/docs/faq.md#%E5%93%AA%E4%BA%9B%E4%BF%AE%E6%94%B9%E5%8F%AF%E4%BB%A5%E7%83%AD%E6%9B%B4%E6%96%B0%E5%93%AA%E4%BA%9B%E4%B8%8D%E8%83%BD)）：JS 代码、纯 JS 第三方库，以及在 JS 中 `require`/`import` 的图片等资源可以热更新；`harmony/` 目录下的任何改动，包括 ArkTS/C++ 代码、`oh-package.json5` 依赖、权限和 `app.json5` 配置，以及升级含原生代码的第三方库（包括升级 RNOH 本身），都必须重新编译原生包并上传。

### 为什么在 debug 包里热更新后，重启又回滚了？

RNOH 的 debug 构建会把 `isDebugModeEnabled` 置为 true，此时 Pushy 不会执行 `markSuccess`，热更新在下次启动时会被回滚。这是预期行为。请用 release 构建验证热更新的完整流程。JS 侧默认在开发环境（`__DEV__`）中也不检查更新，需要调试检查流程时可以设置 `debug: true`，但实际应用更新仍需在 release 包中进行。

### 上传 .app 时提示无法获取编译时间戳？

逐项检查：

1. `entry/hvigorfile.ts` 中是否已启用 `reactNativeUpdatePlugin()`；
2. 是否以 release 模式构建（debug 构建写入的时间戳为 `0`）；
3. `react-native-update` 是否为最新版本，更新后需要重新编译。

可以先运行 `pushy parseApp <app文件>` 查看解析结果。

### 上传时提示找不到 bundle 文件？

命令行从 `.app` 中嵌套的 hap 里查找 `resources/rawfile/bundle.harmony.js`。请确认编译前已执行 `pushy bundle --platform harmony`（或用你自己的方式）把 bundle 放到了 `harmony/entry/src/main/resources/rawfile/`，并且文件名没有被改成其他名字。

### 鸿蒙上热更新后如何重启应用？

调用 JS 的重启接口（例如 `updateStrategy` 为 `silentAndNow`，或在自定义界面中调用切换版本的方法）时，release 模式下 Pushy 会通过系统的 `restartApp` 重启应用；若系统在短时间内限制了重启（例如冷启动后几秒内），会在约 1.5 秒后自动改为重载 RN 实例。debug 模式下则直接重载 RN 实例。

### 可以只用鸿蒙的预编译 har，不从源码编译吗？

`pushy.har` 已随 npm 包发布，按上文配置即引用预编译的 har，C++ 侧只需编译少量 TurboModule 胶水代码。升级 `react-native-update` 后 har 随之更新，需要重新编译原生包。若你从源码自行构建 har，请确保使用与 npm 包版本对应的源码。

### 还有其他问题？

可以先查阅[常见问题](https://pushy.reactnative.cn/docs/faq.md)，或在 [GitHub issues](https://github.com/reactnativecn/react-native-update/issues) 中反馈，反馈时请注明 React Native、RNOH 与 `react-native-update` 的版本。
