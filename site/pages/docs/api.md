---
order: 11
title: API参考
type: 开发指南
---

### JavaScript 方法

#### new Pushy(options: PushyOptions)

创建 Pushy 热更新服务实例，其构造参数如下：

```ts
interface PushyOptions {
  // 必填，通过pushy createApp或selectApp命令，或在网页管理端获取
  appKey: string;

  // 如已购买私有部署服务，可在此自定义私有服务器地址
  server?: {
    // 主节点
    main: string;
    // 备用节点群
    backups?: string[];
    // 远程查询节点接口
    queryUrl?: string;
  };

  // 自定义日志输出，也可用于上报统计数据
  logger?: ({ type, data }: { type: EventType; data: EventData }) => void;
  // 是否使用系统默认的alert页面提示热更， 默认为true
  useAlert?: boolean;
  // 触发自动检查更新的策略
  strategy?:
    | "onAppStart" // 仅在app启动时
    | "onAppResume" // 仅在app从后台切换到前台时
    | "both"; // 默认值，同时包含前两个场景
  // 是否在热更重启后自动标记为成功，默认为true
  autoMarkSuccess?: boolean;
  // 是否在若干ms后自动清除最后的报错，默认为不清除
  dismissErrorAfter?: number;
}

// 日志事件类型
type EventType =
  // 更新失败，重启后发生回滚
  | "rollback"
  // 检查更新时报错
  | "errorChecking"
  // 正在发起检查
  | "checking"
  // 正在下载更新
  | "downloading"
  // 更新失败
  | "errorUpdate"
  // 更新成功
  | "markSuccess"
  // 下载apk
  | "downloadingApk"
  // 下载apk前申请存储权限被用户拒绝
  | "rejectStoragePermission"
  // 下载apk前申请存储权限发生错误
  | "errorStoragePermission"
  // 下载apk时发生错误
  | "errowDownloadAndInstallApk";

// 日志事件数据
interface EventData {
  // 当前已完成的热更hash值，如尚未热更则为空字符串
  currentVersion: string;
  // 客户端版本信息
  cInfo: {
    pushy: string; // 当前pushy版本
    rn: string; // 当前rn版本
    os: string; // 当前操作系统及版本
    uuid: string; // 用户标识符
  };
  // 客户端原生版本号
  packageVersion: string;
  // 编译时间戳
  buildTime: number;
  // 报错相关的信息
  message?: string;
  // 发生回滚的版本hash值
  rolledBackVersion?: string;
  // 更新失败的新版本hash值
  newVersion?: string;
  // 其他一些数据
  [key: string]: any;
}
```

#### usePushy()

热更相关的工具函数。

```js
const {
  checkUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
  dismissError,
  downloadUpdate,
  downloadAndInstallApk,
  getCurrentVersionInfo,
  currentHash,
  packageVersion,
  client,
  progress,
  updateInfo,
  lastError,
} = usePushy();
```

其类型定义和功能如下：

```ts
interface PushyContext {
  // 检查更新
  checkUpdate: () => Promise<void>;
  // 下载热更完成后调用，立即重启切换新版本
  switchVersion: () => void;
  // 下载热更完成后调用，用户手动重启app后切换新版本（静默更新）
  switchVersionLater: () => void;
  // 热更完成重启后，手动标记热更完成
  markSuccess: () => void;
  // 清除最后的报错状态
  dismissError: () => void;
  // 下载热更
  downloadUpdate: () => Promise<void>;
  // 下载并安装apk
  downloadAndInstallApk: (url: string) => Promise<void>;
  // 获取当前已热更版本的信息
  getCurrentVersionInfo: () => Promise<{
    name?: string;
    description?: string;
    metaInfo?: string;
  }>;
  // 当前的版本hash
  currentHash: string;
  // 当前的原生版本号
  packageVersion: string;
  // 当前的pushy热更服务示例
  client?: Pushy;
  // 下载开始后的进度数据
  progress?: {
    hash: string;
    // 已下载的字节数
    received: number;
    // 待下载的总字节数
    total: number;
  };
  // 热更相关信息
  updateInfo?: {
    // 已是最新版本，无需热更
    upToDate?: true;
    // 当前原生版本已过期，需要下载新的原生版本
    expired?: true;
    // 在pushy网页管理端设置的原生版本下载地址
    downloadUrl?: string;
    // 是否存在新的热更
    update?: true;
    // 新热更的版本名称
    name?: string;
    // 新热更的hash值
    hash?: string;
    // 新热更的更新说明
    description?: string;
    // 新热更携带的额外元数据
    metaInfo?: string;
    // 差量热更包的下载地址
    diffUrl?: string;
    // 备用热更包的下载地址（不同的差量策略）
    pdiffUrl?: string;
    // 完成热更包的下载地址
    updateUrl?: string;
    // 当前热更是否已暂停
    paused?:
      | "app" // 当前应用所有原生版本暂停
      | "package"; // 仅当前原生版本暂停
    // 其他信息
    message?: string;
  };
  // 检查、下载、应用热更等过程中的最新一次报错
  lastError?: Error;
}
```

---

#### async function checkUpdate()

触发更新检查，更新`usePushy`中的`updateInfo`，返回值有三种情形：

1. `{expired: true}`：该应用原生包已过期（三种情况：1. 主动设置为过期状态，2. 主动删除，3. 从未上传），需要引导用户下载或跳转到应用市场(需要在网页管理端设置中填写`downloadUrl`)。

```js
{
    expired: true,
    downloadUrl: 'http://appstore/downloadUrl',
}
```

2. `{upToDate: true}`：当前已经更新到最新，无需进行更新。

3. `{update: true}`：当前有新版本可以更新。`name`、`description`字段可以用于展示给用户版本号，更新内容等信息，而`metaInfo`字段则可以根据你的需求自定义一些标记(如是否静默更新、是否强制更新等等，自己根据标记的属性做一些条件流程控制)，具体用法可参考[场景实践](bestpractice#%E5%85%83%E4%BF%A1%E6%81%AFmeta-info%E7%9A%84%E4%BD%BF%E7%94%A8)。另外还有几个字段，包含了热更新文件的下载地址，

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

#### async function downloadAndInstallApk(url)

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

手动调用此函数作为更新成功的标记（否则下次启动会默认失败自动回滚）。默认情况下不需调用此函数，除非设置`autoMarkSuccess`为`false`。

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
