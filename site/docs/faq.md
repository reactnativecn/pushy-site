---
order: 23
title: 常见问题
type: 其他
---

如果本页面没能回答您的疑问，您可以去[issues区](https://github.com/reactnativecn/react-native-pushy/issues)提问或给我们发[邮件](mailto:hi@charmlot.com)。

### 业务问题

#### 哪些修改可以热更新？哪些不能？

我们把对应用的修改分为两类：
- 不可热更新 —— 原生修改，即所有需要`编译`后才能生效的修改：
   - 任何在iOS或者Android目录中的修改、增删。
   - 任何含有原生代码的第三方组件的更新、修改。
- 可以热更新 —— 非原生修改，即所有`无需编译`，刷新即可生效的修改：
   - js代码修改，包括第三方纯js组件的更新、修改。
   - 可以在js代码中require/import的资源文件，例如图片。
  
需要注意的是，即便资源文件可以热更新，但这些热更新后的资源文件会以`file://`协议的形式提供访问，某些读取资源文件的第三方可能并不支持`file://`协议。


#### 我是否可以搭建自己的热更新服务？

你可以单独使用本组件的原生部分(不包括js模块)和命令行工具中的`bundle`、`diff`、`diffFromIpa`、`diffFromApk`四个功能。

这些功能都不会使用我们的热更新服务，也无需注册或登录账号。但你可能要编写自己的js模块来与不同的热更新服务器通讯。

如果您有兴趣搭建私有云服务，可以[邮件联系我们](mailto:hi@charmlot.com)。

#### (由于不明确的原因)，iOS 上使用热更新审核被拒怎么办？

首先请确定你集成了最新版本，提交审核期间请不要发布任何热更新，不要做任何与更新相关的弹出提示。若以上都照做了仍然由于种种不明确的原因被拒（有一定几率），则可以按此步骤单独屏蔽 iOS 端(`react-native-update`版本需 >= 5.3.2)：

1. 如果 RN 版本>=0.60，在项目根目录下编辑或创建 react-native.config.js，添加如下内容
```js
// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-update': {
      platforms: {
        ios: null, // 阻止ios模块自动链接
      },
    },
  },
};
```

2. 如果在原生代码端尚未配置，则跳过下面文档中的 ios 端的配置。如果已经配置，则按文档的步骤反向操作（添加的 ios 代码删去）。
3. 如果是 0.60 以上版本或使用了 cocoapods，在 ios 目录中再次运行 pod install，确保 Podfile 和 Podfile.lock 中都没有'react-native-update'。如果 RN 版本<0.60，则运行`react-native unlink react-native-update`。
4. 在 js 代码里调用 checkUpdate()方法前，判断 Platform.OS，如果是 ios 平台则直接 return 跳过。

#### XCode编译时报错 "_BZ2_bzRead", referenced from 等

在工程target的Build Phases->Link Binary with Libraries中加入libz.tbd、libbz2.1.0.tbd

#### 热更新成功完成，但是重启后又回滚了是怎么回事？

可以正常更新，但是重启后回滚，一般有两种可能的情况：
- 没有正确[配置bundleUrl](/docs/getting-started#配置bundle-url)
- 没有正确[调用markSuccess](/docs/integration#%E9%A6%96%E6%AC%A1%E5%90%AF%E5%8A%A8%E3%80%81%E5%9B%9E%E6%BB%9A)
  
如果你确定上述两个步骤都正确无误，请在[issues区](https://github.com/reactnativecn/react-native-pushy/issues)给我们留言反馈。

### 付费问题

#### 我应该选择哪个业务版本呢？

其实完全无需考虑，先从免费版开始体验，各个版本功能完全一致！当前版本不能满足需求时，可随时补差价升级到更高额度的版本。升级自动按天数计算差价，绝无额外费用。

#### 付费业务到期后不续费，现有应用还能否正常使用？

到期后按免费版额度执行。如您现有应用已超出限额，则必须通过删除操作降低到限额以内，方可执行新的操作（如创建应用，上传热更等），但不影响用户获取之前已发布的热更。

#### 如何获取付费的专人技术支持？

请将您的用户名和订单截图发送至<hi@charmlot.com>，同时提供您希望的技术联系方式（QQ、微信等），核实后会有技术专员添加您为好友。

#### 如何开具发票？

请将具体开票需求发送至<hi@charmlot.com>，并附上注册用户名和订单截图。

