---
order: 12
title: 命令行工具（内置）
type: 开发指南
---

### 安装

```
$ npm install -g react-native-update-cli
```

### 命令

#### pushy bundle

生成热更资源包。会自动探测项目中是否使用了 expo、taro 等框架并自动调用对应的命令行打包。如果探测不准确或使用对应命令行打包时报错，可尝试使用 `--rncli` 参数来指定官方命令行打包。

- platform: ios|android|harmony 对应的平台
- entryFile: 入口脚本文件
- intermediaDir: 临时文件输出目录
- output: 最终 ppk 文件输出路径
- dev: 是否打包开发版本
- sourcemap: 是否生成 sourcemap(需 cli 版本 1.11.0+)
- no-interactive: 不进行交互式提示
- rncli: 指定使用官方命令行打包 (需 cli 版本 1.40.0+)
- expo: 指定使用 expo 的命令行打包 (需 cli 版本 1.40.0+)
- taro: 指定使用 taro 的命令行打包 (需 cli 版本 1.40.0+)

从 v1.44.2 版本开始，新增了以下直接上传发布的参数（等同于打包完成后连续调用 `pushy publish` 命令）：

- name: 指定热更新版本的名字(版本号)
- description: 指定热更新版本的描述信息，可以对用户进行展示
- metaInfo: 指定热更新版本的元信息，可以用来保存一些额外信息，具体用法可参考[场景实践](bestpractice#%E5%85%83%E4%BF%A1%E6%81%AFmeta-info%E7%9A%84%E4%BD%BF%E7%94%A8)。

从 v1.46.1 版本开始，在传入 `name`， `description`， `metaInfo` 参数的同时，可继续叠加以下参数（等同于在 调用`pushy publish` 命令后，再连续调用 `pushy update` 命令）：

- packageId: 要绑定的原生包 ID （多选一）
- packageVersion: 要绑定的原生包版本名（多选一）
- minPackageVersion: 要绑定的最低原生包版本，大于等于此版本的将逐个绑定（多选一）
- maxPackageVersion: 要绑定的最高原生包版本，小于等于此版本的将逐个绑定（多选一）
- packageVersionRange: 要绑定的原生包版本范围（多选一），范围格式遵循 semver 的语法，可参考 <https://quickref.cnxiaobai.com/docs/semver.html> 或 <https://devhints.io/semver>

示例：

```bash

pushy bundle --platform android --name "1.0.0" --description "热更新版本 1.0.0" --metaInfo '{"key": "value"}' --packageVersionRange ">=1.0 <3.0"
```

---

#### pushy parseIpa [ipaFile]

解析 ipa 文件并输出一些相关信息，如版本号，编译时间戳等。

---

#### pushy parseApk [apkFile]

解析 apk 文件并输出一些相关信息，如版本号，编译时间戳等。

---

#### pushy parseApp [appFile]

解析 app 文件并输出一些相关信息，如版本号，编译时间戳等。

---

#### pushy diff [origin][next]

提供两个 ppk 文件，生成从 origin 到 next 版本的差异更新包。

- output: diff 文件输出路径

---

#### pushy diffFromApk [apkFile][next]

提供一个 apk 文件和一个 ppk 文件，生成从 apk 文件到 next 版本的差异更新包。

如果使用热更新开放平台，你不需要自己执行此命令。

- output: diff 文件输出路径

---

#### pushy diffFromApp [appFile][next]

提供一个 app 文件和一个 ppk 文件，生成从 app 文件到 next 版本的差异更新包。

如果使用热更新开放平台，你不需要自己执行此命令。

- output: diff 文件输出路径

---

#### pushy diffFromIpa [ipaFile][next]

提供一个 ipa 文件和一个 ppk 文件，生成从 ipa 文件到 next 版本的差异更新包。

如果使用热更新开放平台，你不需要自己执行此命令。

- output: diff 文件输出路径

---

#### pushy login [email][pwd]

登录热更新开放平台。你需要先登录才能使用下面的命令。

---

#### pushy logout

登出并清除本地的登录信息

---

#### pushy me

查看自己是否已经登录，以及昵称等信息。

---

#### pushy createApp

创建应用并立刻绑定到当前工程。这项操作也可以在网页管理端进行。

- platform: ios|android|harmony 对应的平台
- name: 应用名称
- downloadUrl: 应用安装包的下载地址

---

#### pushy deleteApp [appId]

删除已有应用。所有已创建的应用包、热更新版本都会被同时删除。这项操作也可以在网页管理端进行。

- platform: ios|android|harmony 对应的平台

---

#### pushy apps

查看当前已创建的全部应用。这项操作也可以在网页管理端进行。

- platform: ios|android|harmony 对应的平台

---

#### pushy selectApp [appId]

绑定应用到当前工程。

- platform: ios|android|harmony 对应的平台

---

#### pushy uploadIpa [ipaFile]

上传 ipa 文件到开放平台。

- note: 备注（cli 需 1.24.0 +）

---

#### pushy uploadApk [apkFile]

上传 apk 文件到开放平台。

- note: 备注（cli 需 1.24.0 +）

---

#### pushy uploadApp [appFile]

上传 app 文件到开放平台。

- note: 备注（cli 需 1.24.0 +）

---

#### pushy packages

查看已经上传的原生包。这项操作也可以在网页管理端进行。

- platform: ios|android|harmony 对应的平台

---

#### pushy publish [ppkFile]

发布新的热更新版本（ppk 文件）。

- platform: ios|android|harmony 对应的平台
- name: 当前热更新版本的名字(版本号)
- description: 当前热更新版本的描述信息，可以对用户进行展示
- metaInfo: 当前热更新版本的元信息，可以用来保存一些额外信息，具体用法可参考[场景实践](bestpractice#%E5%85%83%E4%BF%A1%E6%81%AFmeta-info%E7%9A%84%E4%BD%BF%E7%94%A8)。

从 v1.46.1 版本开始，支持以下参数（等同于在 调用`pushy publish` 命令后，再连续调用 `pushy update` 命令）：

- packageId: 要绑定的原生包 ID （多选一）
- packageVersion: 要绑定的原生包版本名（多选一）
- minPackageVersion: 要绑定的最低原生包版本，大于等于此版本的将逐个绑定（多选一）
- maxPackageVersion: 要绑定的最高原生包版本，小于等于此版本的将逐个绑定（多选一）
- packageVersionRange: 要绑定的原生包版本范围（多选一），范围格式遵循 semver 的语法，可参考 <https://quickref.cnxiaobai.com/docs/semver.html> 或 <https://devhints.io/semver>

示例：

```bash

pushy publish .pushy/output/android.1750423283653.ppk --platform android --name "1.0.0" --description "热更新版本 1.0.0" --metaInfo '{"key": "value"}' --packageVersionRange ">=1.0 <3.0"
```

---

#### pushy versions

分页列举可用的版本。这项操作也可以在网页管理端进行。

- platform: ios|android|harmony 对应的平台

---

#### pushy update

为一个原生包版本绑定发布一个热更新版本。这项操作也可以在网页管理端进行。以下参数中`packageId`，`packageVersion`，`minPackageVersion`，`maxPackageVersion`和`packageVersionRange`中多选一即可。

cli 2.4.0 版本开始可以同时绑定一个全量和一个灰度版本。2.4.0 之前全量和灰度版本会互相覆盖，后设置的生效。

- platform: ios|android|harmony 对应的平台
- versionId: 要绑定的热更新版本 ID
- rollout: 灰度发布范围（整数取值 1 - 100，对应 1% - 100% 用户覆盖率），默认为 100（需 cli 版本 1.31.0+）
- dryRun: 是否只进行预览，不进行实际绑定（需 cli 版本 1.45.4+）
- packageId: 要绑定的原生包 ID （多选一）
- packageVersion: 要绑定的原生包版本名（多选一，需 cli 版本 1.7.2+）
- minPackageVersion: 要绑定的最低原生包版本，大于等于此版本的将逐个绑定（多选一，需 cli 版本 1.27.0+）
- maxPackageVersion: 要绑定的最高原生包版本，小于等于此版本的将逐个绑定（多选一，需 cli 版本 1.27.0+）
- packageVersionRange: 要绑定的原生包版本范围（多选一，需 cli 版本 1.45.4+），范围格式遵循 semver 的语法，可参考 <https://quickref.cnxiaobai.com/docs/semver.html> 或 <https://devhints.io/semver>

示例：

```bash
❯ pushy update --versionId 211343 --platform android --packageVersionRange ">=1.0 <3.0" --dryRun
react-native-update-cli: 1.45.4 （最新：1.45.4）
react-native-update: 10.28.11 （最新：10.28.11）
以下是 dry-run 模拟运行结果，不会实际执行任何操作：
已将热更包 211343 绑定到原生版本 1.28.1 (id: 75219)
已将热更包 211343 绑定到原生版本 1.28 (id: 75184)
已将热更包 211343 绑定到原生版本 1.5 (id: 73396)
已将热更包 211343 绑定到原生版本 2.0 (id: 68219)
已将热更包 211343 绑定到原生版本 1.0 (id: 68158)
操作完成，共已绑定 5 个原生版本
```
