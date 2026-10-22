> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# 原生 App 混编集成（Brownfield）

本页适用于通过 [`@callstack/react-native-brownfield`](https://oss.callstack.com/react-native-brownfield/) 生成 React Native AAR、再由 Android 原生 App 引入的混编项目。

这类项目通常具有以下特点：

- 宿主 `Application` 没有实现 `ReactApplication`
- 宿主 `Activity` 没有继承 `ReactActivity`
- React Native 运行时在 AAR 模块内部初始化，一般通过 `ReactNativeHostManager` 或类似的类完成

不需要为了接入 Pushy 而修改宿主 App 的继承关系。只需在 AAR 模块创建 `ReactHost`、`ReactNativeHost` 或 `ReactInstanceManager` 的位置接入 Pushy 即可。

:::info 原生宿主的更新控制（v10.59.0+）
宿主也可以不经过 JS Bridge，直接在原生层配置并触发热更新。`PushyRuntime.configure(...)`、`prepareBundle(...)` 与 `nativeConfigSource: "native"` 的用法请参阅[原生主动检测与更新](https://pushy.reactnative.cn/docs/native-api.md)；原生配置省略 `endpoints` 时即使用 Pushy 内置服务地址。请在 RN 正常启动之前完成配置，或在本次启动已完成 bundle 解析之后再检查；不要仅为了触发检查而再次调用 `getBundleUrl`。React Native AAR 和宿主 APK／AAB 都需要使用 v10.59.0 或更高版本重新编译。下文的 JS 示例沿用默认的由 JS 管理配置的方式；如需由宿主原生端掌控配置，请使用原生文档中的配置归属选项。
:::


### 安装依赖
在 React Native 项目根目录下运行：
```bash
# 先全局安装命令行工具
npm i -g react-native-update-cli

# 然后在项目目录中安装热更新模块
npm i react-native-update
```
请确认 AAR 中包含了 `react-native-update` 的 Android 模块。如果自动 link 没有把它加入你的 library 模块，请手动添加：
```groovy
dependencies {
    api project(":react-native-update")
}
```
:::warning
如果 `PackageList(application).packages` 中已经包含 `UpdatePackage()`，请不要重复添加。
:::
### 在 AAR 模块中注册 UpdatePackage
JS 接口依赖 Android 原生模块。请在 AAR 模块创建 package 列表的位置确认已包含 `UpdatePackage`：
```kotlin
import cn.reactnative.modules.update.UpdatePackage
import com.facebook.react.PackageList

val packages = PackageList(application).packages.apply {
  // 如果自动 link 已经包含 UpdatePackage，请删除这一行
  add(UpdatePackage())
}
```
### 新架构：配置 ReactHost
对于 RN 0.82 及以上版本，或任何通过 `ReactHost`／`getDefaultReactHost` 初始化 React Native 的混编模块，请把 Pushy 提供的 bundle 路径传给 `jsBundleFilePath`：
```kotlin
package com.yourapp.reactnativeapp

import android.app.Application
import cn.reactnative.modules.update.UpdateContext
import cn.reactnative.modules.update.UpdatePackage
import com.callstack.reactnativebrownfield.OnJSBundleLoaded
import com.callstack.reactnativebrownfield.ReactNativeBrownfield
import com.facebook.react.PackageList
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

object ReactNativeHostManager {
  private var reactHost: ReactHost? = null

  fun initialize(
    application: Application,
    onJSBundleLoaded: OnJSBundleLoaded? = null,
  ) {
    // RN >= 0.80 必需
    loadReactNative(application)

    val packages = PackageList(application).packages.apply {
      // 如果自动 link 已经包含 UpdatePackage，请删除这一行
      add(UpdatePackage())
    }

    reactHost = getDefaultReactHost(
      context = application.applicationContext,
      packageList = packages,
      // ↓↓↓ 使用 Pushy 提供的 bundle 路径
      jsBundleFilePath = UpdateContext.getBundleUrl(
        application,
        "assets://index.android.bundle",
      ),
      // ↑↑↑
    )

    ReactNativeBrownfield.initialize(
      application = application,
      reactHost = reactHost,
      onJSBundleLoaded = onJSBundleLoaded,
    )
  }

  fun getReactHost(): ReactHost? = reactHost
}
```
`assets://index.android.bundle` 是尚未应用任何热更新时使用的内置 bundle，请改成 AAR 中实际打包的 bundle 文件名。
### 在宿主 Application 中暴露 ReactHost
新架构下，热更新完成后调用 `switchVersion()` 或 `restartApp()` 重载 RN 运行时，Pushy 需要找到当前活动的 `ReactHost`。
如果宿主 `Activity` 不是 `ReactActivity`，宿主 `Application` 也不是 `ReactApplication`，请在宿主 `Application` 中提供一个 public 的 `getReactHost()` 方法：
```kotlin
import android.app.Application
import com.facebook.react.ReactHost
import com.yourapp.reactnativeapp.ReactNativeHostManager

class MainApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    ReactNativeHostManager.initialize(this)
  }

  fun getReactHost(): ReactHost? {
    return ReactNativeHostManager.getReactHost()
  }
}
```
Pushy 会通过反射查找这个方法，宿主 `Application` 不需要实现 `ReactApplication`。
:::warning
仅传入 `jsBundleFilePath` 即可保证冷启动加载热更新版本；而要让新架构混编 App 在 `switchVersion()`／`restartApp()` 时可靠地立即重载运行时，还需要暴露 `getReactHost()`。
:::
### 旧架构或自定义 ReactInstanceManager
如果你的混编方案仍然手动创建 `ReactInstanceManager`，请在这里设置 bundle 路径：
```kotlin
import cn.reactnative.modules.update.UpdateContext

val reactInstanceManager = ReactInstanceManager.builder()
  // ...其他设置
  // 不要调用 setBundleAssetName("index.android.bundle")
  .setJSBundleFile(
    UpdateContext.getBundleUrl(
      application,
      "assets://index.android.bundle",
    )
  )
  .build()

UpdateContext.setCustomInstanceManager(reactInstanceManager)
```
`setCustomInstanceManager` 的说明见 [API 文档](https://pushy.reactnative.cn/docs/api.md#updatecontextsetcustominstancemanagerreactinstancemanager-instancemanager)。新架构 App 请优先使用上面的 `ReactHost` 方式。
### 包裹 JS 根组件
JS 端与普通 React Native 应用相同（详见[代码集成](https://pushy.reactnative.cn/docs/integration.md)）：
```tsx
import { Platform } from "react-native";
import { Pushy, UpdateProvider } from "react-native-update";
import updateConfig from "./update.json";
import App from "./App";

const pushyClient = new Pushy({
  appKey: updateConfig[Platform.OS].appKey,
  checkStrategy: "both",
  updateStrategy: "silentAndLater",
});

export default function Root() {
  return (
    <UpdateProvider client={pushyClient}>
      <App />
    </UpdateProvider>
  );
}
```
`update.json` 由 `pushy createApp` 或 `pushy selectApp` 生成，请参阅[安装配置](https://pushy.reactnative.cn/docs/getting-started.md)中的「登录与创建应用」。
### 打包与发布
1. 重新编译 React Native AAR，并确认宿主 App 引用的是新产物。
2. 编译最终的宿主 APK／AAB。
3. 使用 `pushy uploadApk` 或 `pushy uploadAab` 上传最终的宿主安装包（参阅[命令行工具](https://pushy.reactnative.cn/docs/cli.md)）。
4. 发布热更新时，选择与最终宿主 App 的 `versionName` 和编译时间戳一致的原生包版本（参阅[发布热更新](https://pushy.reactnative.cn/docs/publish.md)）。
:::info
Pushy 只更新 JS bundle 和 JS 引用的静态资源。新增原生模块、修改 Kotlin／Java 代码、修改 Manifest 或 `.so` 等原生改动，仍需重新发布 AAR 和宿主 App。
:::
