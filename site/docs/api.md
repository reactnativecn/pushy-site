---
order: 11
title: API参考
type: 开发指南
---

### JavaScript 常量

---

#### downloadRootDir

下载的根目录。你可以使用 react-native-fs 等第三方组件检查其中的内容。

---

#### packageVersion

当前应用原生包的版本。其中 android 取自`versionName`字段(位于`android/app/build.gradle`中)。ios 取自`CFBundleShortVersionString`字段(位于`ios/项目名/Info.plist`中)。

---

#### currentVersion

当前热更新版本（jsbundle 文件）的 Hash 号。

---

#### isFirstTime

是否更新后的首次启动。当此项为真时，你需要在合适的时候调用`markSuccess()`以确保更新成功。否则应用下一次启动时将会回滚。

---

#### isRolledBack

是否刚刚经历了一次回滚。

### JavaScript 方法

---

#### async function checkUpdate(appKey)

检查更新，返回值有三种情形：

1. `{expired: true}`：该应用原生包已过期（已从 pushy 服务器中删除），需要前往应用市场下载新的版本(在设置中填写 downloadUrl)。

```
    {
        expired: true,
        downloadUrl: 'http://appstore/downloadUrl',
    }
```

2. `{upToDate: true}`：当前已经更新到最新，无需进行更新。

3. `{update: true}`：当前有新版本可以更新。info 的`name`、`description`字段可以用于提示用户，而`metaInfo`字段则可以根据你的需求自定义其它属性(如是否静默更新、是否强制更新等等)。另外还有几个字段，包含了热更新文件的下载地址，

```
    {
        update: true,
        name: '1.0.3-rc',
        hash: 'hash',
        description: '添加聊天功能\n修复商城页面BUG',
        metaInfo: '{"silent":true}',
        pdiffUrl: 'http://update-packages.reactnative.cn/hash',
        diffUrl: 'http://update-packages.reactnative.cn/hash',
    }
```

---

#### async function downloadUpdate(info, callbacks)

下载更新版本。`info`为`checkUpdate`函数的返回值，并且仅当`update:true`时实际进行下载。

从`v5.8.3`版本开始新增接受第二个可选参数，为下载进度的回调函数（`onDownloadProgress`）。可根据回调参数自行设计进度的展示。示例：

```javascript
const hash = await downloadUpdate(
  info,
  // 下载回调为可选参数，自v5.8.3版本起可用
  {
    onDownloadProgress: ({ received, total }) => {
      // 已下载的字节数, 总字节数
      console.log(received, total);
    },
  },
);
```

---

#### async function downloadAndInstallApk({ url, onDownloadProgress })

下载更新的 apk 包并直接安装。`url`必须为可直接下载到 apk 文件的地址，`onDownloadProgress`为可选的下载进度回调函数，可根据回调参数自行设计进度的展示。自`v5.9.0`版本起可用。

---

#### function switchVersion(hash)

立即重启应用，并加载已经下载完毕的版本。

---

#### function switchVersionLater(hash)

在下一次启动应用的时候加载已经下载完毕的版本。

---

#### function markSuccess()

在`isFirstTime`为`true`时，必须调用此函数作为更新成功的标记（否则下次启动会默认失败自动回滚）。

---

### Android 方法

#### UpdateContext.setCustomInstanceManager(ReactInstanceManager instanceManager)

如果是集成/混编 Android 方案，则可以使用此方法传入你自行创建的 ReactInstanceManager。自`v5.5.8`版本起可用。

示例：

```java
import cn.reactnative.modules.update.UpdateContext

mReactInstanceManager = ReactInstanceManager.builder()
                // ...各种setter，但注意不要调用setBundleAssetName
                .setJSBundleFile(UpdateContext.getBundleUrl(mContext))
                .build();
UpdateContext.setCustomInstanceManager(mReactInstanceManager);
```

### iOS 方法

待补充
