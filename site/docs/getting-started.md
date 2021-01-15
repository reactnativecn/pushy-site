---
order: 0
title: 安装配置
type: 快速入门
---

首先你应该有一个基于React Native开发的应用，我们把具有package.json的目录叫做你的"应用根目录"。

如果你还没有初始化应用，请参阅[开始使用React Native](https://reactnative.cn/docs/getting-started)。

所以我们也假设你已经拥有了开发React Native应用的一切环境，包括`Node.js`、`XCode`、`Android SDK`等等。

## 安装

在你的项目根目录下运行以下命令：

```bash
# 全局安装命令行工具，每台电脑只用装一次
npm i -g react-native-update-cli

# 在项目中安装热更新模块
npm i react-native-update
```  

> 如果下载极慢或者显示网络失败，请设置使用淘宝镜像`npx nrm use taobao`

如果你的RN版本 >= 0.60，请在iOS目录下执行:

```bash
pod install
```

如果你的RN版本 < 0.60，那么还需要[手动link](#手动link)

> 注意：如果是混编RN项目，由于目前官方集成文档并不完善，参照官方文档可能无法实现自动link功能。此时即便RN版本 >= 0.60，你可能也需要执行手动link操作。

<details>
<summary>
如果你的RN版本比较老（< 0.46），请点击这里的注意事项
</summary>

如果你的RN版本比较老，请按下面表格尝试老一些的版本（但这些版本我们已不再维护，不能保证可以使用）：

| React Native版本 | react-native-update版本 |
| ---------------- | ----------------------- |
| 0.26及以下       | 1.0.x                   |
| 0.27 - 0.28      | 2.x                     |
| 0.29 - 0.33      | 3.x                     |
| 0.34 - 0.45      | 4.x                     |

安装命令示例：
```bash
npm i react-native-update@4.x
```

如果RN的版本是0.45及以下，你还必须安装[Android NDK](http://androiddevtools.cn)，版本最好选用r10e，并设置环境变量`ANDROID_NDK_HOME`，指向你的NDK根目录(例如`/Users/tdzl2003/Downloads/android-ndk-r10e`)。
</details>


> 请记得，任意在ios和android目录下的修改，一定要重新编译（npx react-native run-ios或run-android命令编译，或在Xcode/Android Studio中重新编译）才能生效。


## 手动link

如果RN版本 >= 0.60则不需要此手动link步骤。

> 注意：如果是混编RN项目，由于目前官方集成文档并不完善，参照官方文档可能无法实现自动link功能。此时即便RN版本 >= 0.60，你可能也需要执行手动link操作。

### iOS

<details>
<summary>RN < 0.60且使用CocoaPods（推荐）</summary>

1. 在ios/Podfile中添加
```
pod 'react-native-update', path: '../node_modules/react-native-update'
```
2. 在项目的ios目录下运行`pod install`
3. 重新编译
   
</details>

<details>
<summary>RN < 0.60且不使用CocoaPods</summary>

1. 在XCode中的Project Navigator里,右键点击`Libraries` ➜ `Add Files to [你的工程名]`
2. 进入`node_modules` ➜ `react-native-update` ➜ `ios 并选中 `RCTPushy.xcodeproj`
3. 在XCode中的project navigator里,选中你的工程,在 `Build Phases` ➜ `Link Binary With Libraries` 中添加 `libRCTPushy.a`、`libz.tbd`、`libbz2.1.0.tbd`
5. 继续在`Build Settings`里搜索`Header Search Path`，添加`$(SRCROOT)/../node_modules/react-native-update/ios`，勾选`recursive`。
6. 在`Build Phases`添加一个`New Run Script Phase`运行脚本，内容如下
```
#!/bin/bash
set -x
DEST="../node_modules/react-native-update/ios/"
date +%s > "$DEST/pushy_build_time.txt"
```

7. 尝试编译一下，顺利的话就会在`../node_modules/react-native-update/ios/`文件夹下面生成一个`pushy_build_time.txt`文件。
然后在`Copy Bundle Resources`里把生成的`pushy_build_time.txt`文件添加进去。

</details>

### Android


<details>
<summary>RN < 0.60</summary>
1. 在`android/settings.gradle`中添加如下代码:  
   
  	```
  	include ':react-native-update'
  	project(':react-native-update').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-update/android')
  	```

2. 在`android/app/build.gradle`的 dependencies 部分增加如下代码:  
  
  	```
    implementation project(':react-native-update')
    ```

3. 打开`android/app/src/main/java/[...]/MainApplication.java`,
  - 在文件开头增加 `import cn.reactnative.modules.update.UpdatePackage;`
  - 在`getPackages()` 方法中增加 `new UpdatePackage()`(注意上一行可能要增加一个逗号)
</details>

## 配置Bundle URL

注意此步骤无论任何版本，目前都需要手动配置。

### iOS

在你的AppDelegate.m文件中增加如下代码：

```objectivec
// ... 其它代码
#import "AppDelegate.h"

#import "RCTPushy.h"  // <-- import头文件，注意要放到if条件外面

// 可能项目里有一些条件编译语句，例如RN自带的flipper
#if DEBUG
// 注意**不要**在这里面引入"RCTPushy.h"
#import <FlipperKit/FlipperClient.h>
// ...
#endif


// 如果RN版本 >= 0.59，修改sourceURLForBridge
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // 非DEBUG情况下替换为热更新bundle
  return [RCTPushy bundleURL];
#endif
}

// 如果RN版本 < 0.59，修改didFinishLaunchingWithOptions
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#if DEBUG
  // 原来的jsCodeLocation保留在这里
  jsCodeLocation = ..........
#else
  // 非DEBUG情况下替换为热更新bundle
  jsCodeLocation = [RCTPushy bundleURL];
#endif
  // ... 其它代码
}

```

### Android

在MainApplication中增加如下代码（如果是混编原生的项目或其他原因没有使用ReactApplication，请[使用此api集成](api.html#updatecontextsetcustominstancemanagerreactinstancemanager-instancemanager))：

```java
// ... 其它代码

// 请注意不要少了这句import
import cn.reactnative.modules.update.UpdateContext;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    // 注意这一段在 ReactNativeHost 内部！
    @Override
    protected String getJSBundleFile() {
        return UpdateContext.getBundleUrl(MainApplication.this);
    }
    // ... 其它代码
  }
}
```

> 请记得，任意在ios和android目录下的修改，一定要重新编译（npx react-native run-ios或run-android命令编译，或在Xcode/Android Studio中重新编译）才能生效。

## 禁用android的crunch优化

android会在生成apk时自动对png图片进行压缩，此操作既耗时又影响增量补丁的生成。为了保证补丁能正常生成，您需要在`android/app/build.gradle`中关闭此操作：

```gradle
...
android {
    ...
    signingConfigs { ... }
    buildTypes {
        release {
            ...
            // 添加下面这行以禁用crunch
            crunchPngs false
        }
    }
}
...
```

## 登录与创建应用

首先请在<https://update.reactnative.cn>注册帐号，然后在你的项目根目录下运行以下命令：

```bash
$ pushy login
email: <输入你的注册邮箱>
password: <输入你的密码>
```

这会在项目文件夹下创建一个`.update`文件，注意不要把这个文件上传到Git等CVS系统上。你可以在`.gitignore`末尾增加一行`.update`来忽略这个文件。

登录之后可以创建应用。注意iOS平台和安卓平台需要分别创建：

```bash
$ pushy createApp --platform ios
App Name: <输入应用名字>
$ pushy createApp --platform android
App Name: <输入应用名字>
```

> 两次输入的名字可以相同，这没有关系。

如果你已经在网页端或者其它地方创建过应用，也可以直接选择应用：

```bash
$ pushy selectApp --platform ios
1) 鱼多多(ios)
2) 招财旺(ios)

Total 2 ios apps
Enter appId: <输入应用前面的编号>
```

选择或者创建过应用后，你将可以在文件夹下看到`update.json`文件，其内容类似如下形式：

```bash
{
    "ios": {
        "appId": 1,
        "appKey": "<一串随机字符串>"
    },
    "android": {
        "appId": 2,
        "appKey": "<一串随机字符串>"
    }
}
```

你可以安全的把`update.json`上传到Git等CVS系统上，与你的团队共享这个文件，它不包含任何敏感信息。当然，他们在使用任何功能之前，都必须首先输入`pushy login`进行登录。

至此应用的创建/选择就已经成功了。下一步，你需要给代码添加相应的功能，请参阅[代码集成](integration)。
