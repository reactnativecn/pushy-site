---
order: 11
title: API参考
type: 开发指南
---


### JavaScript 方法

#### usePushy()

---

#### async function checkUpdate()

检查更新，返回值有三种情形：

1. `{expired: true}`：该应用原生包已过期（三种情况：1. 主动设置为过期状态，2. 主动删除，3. 从未上传），需要前往应用市场下载新的版本(在设置中填写 downloadUrl)。

```js
{
    expired: true,
    downloadUrl: 'http://appstore/downloadUrl',
}
```

2. `{upToDate: true}`：当前已经更新到最新，无需进行更新。

3. `{update: true}`：当前有新版本可以更新。info 的`name`、`description`字段可以用于提示用户，而`metaInfo`字段则可以根据你的需求自定义一些标记(如是否静默更新、是否强制更新等等，自己根据标记的属性做一些条件流程控制)，具体用法可参考[场景实践](bestpractice#%E5%85%83%E4%BF%A1%E6%81%AFmeta-info%E7%9A%84%E4%BD%BF%E7%94%A8)。另外还有几个字段，包含了热更新文件的下载地址，

```js
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

#### async function downloadUpdate()

下载热更包。仅当`update:true`时实际进行下载。会更新`progress`数据。

---

#### function downloadAndInstallApk(url)

下载更新的 apk 包并直接安装。`url`必须为可直接下载到 apk 文件的地址。

注意要使用这个功能还需要在`AndroidManifest.xml`中手动添加安装权限，如果需要考虑 Android 7.0 以下的客户，则还需要添加外部存储权限。

```xml
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

<!-- 如果需要考虑Android 7.0以下的客户，则还需要添加外部存储权限 -->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

注意某些应用市场可能会因为上述权限拒绝应用上架。去掉上述两个权限并不影响热更新功能。

---

#### function markSuccess()

在`isFirstTime`为`true`时，必须调用此函数作为更新成功的标记（否则下次启动会默认失败自动回滚）。

---

#### async function getCurrentVersionInfo()

获取当前已热更版本的信息（如尚未热更过则返回空对象）。

返回值示例：

```js
{
    name: '1.0.3-rc',
    description: '添加聊天功能\n修复商城页面BUG',
    metaInfo: '{"silent":true}',
}
```

---

#### function switchVersion()

立即重启应用，并加载已经下载完毕的版本。

---

#### function switchVersionLater()

在下一次启动应用的时候加载已经下载完毕的版本。

---

#### function onPushyEvents(({ type: EventType; data: EventData }) => void)

发生某个事件时的回调，可用于上报统计数据。自`v8.4.0`版本后可用。其中回调参数构型具体如下：

```ts
// 回调事件类型
export type EventType =
  | "rollback" // 回滚
  | "errorChecking" // 查询热更时出错
  | "checking" // 正在查询热更
  | "downloading" // 正在下载热更
  | "errorUpdate" // 热更时出错
  | "markSuccess" // 热更后成功标记
  | "downloadingApk" // 正在下载apk
  | "rejectStoragePermission" // 下载apk前申请存储权限被用户拒绝
  | "errorStoragePermission" // 下载apk前申请存储权限出错
  | "errowDownloadAndInstallApk"; // 下载或安装apk时出错

// 回调事件数据
export interface EventData {
  currentVersion: string; // 当前版本hash
  cInfo: {
    pushy: string; // 当前pushy版本
    rn: string; // 当前rn版本
    os: string; // 当前操作系统及版本
    uuid: string; // 用户标识符
  };
  packageVersion: string; // 原生包版本
  buildTime: number; // 原生包编译时间戳
  message?: string; // 相关说明信息
  rolledBackVersion?: string; // 热更失败，回滚后的版本hash
  newVersion?: string; // 已下载但热更失败的hash
}
```

---

### Android 方法

#### UpdateContext.setCustomInstanceManager(ReactInstanceManager instanceManager)

如果是集成/混编 Android 方案，则可以使用此方法传入你自行创建的 ReactInstanceManager。自`v5.5.8`版本起可用。

示例：

```java
import cn.reactnative.modules.update.UpdateContext

mReactInstanceManager = ReactInstanceManager.builder()
                // ...各种setter，但注意不要调用setBundleAssetName
                .setJSBundleFile(UpdateContext.getBundleUrl(mContext, "assets://index.android.bundle"))
                .build();
UpdateContext.setCustomInstanceManager(mReactInstanceManager);
```
