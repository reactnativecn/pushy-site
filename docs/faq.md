---
order: 23
title: 常见问题
type: 其他
---

如果本页面没能回答您的疑问，您可以去[issues区](https://github.com/reactnativecn/react-native-pushy/issues)提问或给我们发[邮件](mailto:hi@charmlot.com)。

### 业务问题

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

### 付费问题

#### 可以升级到更高级别的付费业务吗？

免费版用户升级请直接新购业务。标准版用户升级专业版仍需支付完整年费1800元，其原先未消耗完的剩余时长，每五天折算一天后叠加到新生效的时长上（不足五天的仍折算为一天）。

#### 可以降级到较低级别的付费业务吗？

仅支持专业版用户降级为标准版用户，且每年仅能降级一次。降级方式为将其剩余有效时长的每一天折算五天（当天到期的用户不折算）。

#### 付费业务降级或到期后，现有应用还能否正常使用？

降级或到期后按新级别的额度执行（标准版或免费版）。如您现有应用已超出限额，则必须通过删除操作降低到限额以内，方可执行新的操作（如创建应用，上传热更等），但不影响用户获取之前已发布的热更。

#### 如何开具发票？

请将具体开票需求发送至<hi@charmlot.com>，并附上注册用户名和订单截图。

