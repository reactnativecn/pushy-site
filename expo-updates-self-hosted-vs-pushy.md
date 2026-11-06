> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# 自建 Expo Updates 服务器 vs Pushy：成本与工程量对比

当团队发现 EAS Update 的月活用户（MAU）与边缘带宽账单随业务增长迅速膨胀，或者在中国大陆网络下直连海外节点速度不理想时，很自然会产生一个想法：**自己跑一套兼容 `expo-updates` 的更新服务器**。

Expo 在协议层面允许这样做：开源的 `expo-updates` 客户端（MIT）可以指向任何实现了 [Expo Updates Protocol v1](https://docs.expo.dev/technical-specs/expo-updates-1/) 的服务端。本文将把“自建 Expo Updates 服务端”与“直接换用 Pushy”放在同一张桌面上，客观对比两者的真实工程投入、增量能力与长期成本。

> 本文涉及的 Expo 协议与计费事实核对自 Expo 官方技术规范与文档（截至 2026 年 11 月）。如发现任何信息过期，欢迎发邮件至 `hi@charmlot.com` 指正。

## 一句话结论

- **选择自建 Expo Updates 服务端**：如果你必须保留 `expo-updates` 客户端不动，且团队有专门的后端与运维人力来开发、值守一套生产级发布系统。
- **选择 Pushy**：如果你的核心诉求是**可控的固定成本、国内高速 CDN 与 KB 级增量更新**，不想为了热更新额外维护一套后端基础设施——只需替换一次客户端 SDK，即可直接获得 Hermes 增量补丁、崩溃自动回滚、灰度放量与可视化监控后台。若因内网合规必须私有化部署，Pushy 同样提供成熟的商业私有化方案。

## 自建生产级 Expo Updates 服务究竟要自己做哪些事？

Expo 官方仓库中的 [`custom-expo-updates-server`](https://github.com/expo/custom-expo-updates-server) 明确说明只是一个简化演示（Demo），并非生产可用的服务端。要把它投入线上承接真实用户流量，你的团队需要自行研发并长期运维以下六个模块：

1. **协议服务端实现**：完整实现 Protocol v1 的 Manifest 与资源接口、Multipart 响应组装、`runtimeVersion` 匹配、平台筛选与 Channel 分发逻辑。
2. **对象存储与国内 CDN 缓存治理**：托管历次构建的所有 Bundle 与静态资源，完成国内域名备案，并精细配置缓存头——一旦 Manifest 被 CDN 错误缓存，客户端就会拿不到紧急止损包。
3. **代码签名与密钥轮换**：若开启客户端验签以防篡改，需自行管理私钥安全存储、响应签名头生成及证书轮换流程。
4. **脱离 `eas update` 的构建发布流水线**：官方 `eas update` 命令只能发布到 Expo 云端；自建后需要围绕 `npx expo export` 自写脚本完成产物解析、哈希计算、资源去重上传、Manifest 写入与环境晋升。
5. **灰度放量、回滚与监控台**：协议仅定义了 `rollBackToEmbedded` 指令；按比例灰度分桶、版本激活漏斗、失败诊断与操作后台全部需要从零开发。
6. **没有现成的差量补丁标准**：这是最容易踩坑的一点——虽然托管版 EAS Update 从 SDK 55 起支持了 bsdiff 补丁，但**公开的 Expo Updates 协议规范并未定义自定义服务端如何下发二进制差量补丁**。除非你再自行改造协议与客户端，否则每次只改一行文案也只能向全量用户下发数 MB 的完整 Bundle，CDN 流量账单依然可观。

## 逐项能力对比

| 对比维度           | 自建 Expo Updates 服务器                              | Pushy（`react-native-update`）                                                                         |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **客户端库**       | `expo-updates`（MIT）                              | `react-native-update`（MIT），Expo SDK 50+ 通过 `prebuild` 自动配置 Bundle URL                                |
| **服务端建设与值班**   | 团队自行研发、部署、升级与 7×24 故障值守                          | 开箱即用全托管（或采购官方支持的私有化部署版本）                                                                             |
| **发布命令**       | 围绕 `npx expo export` 自研上传与发布流水线                  | 一条 `pushy bundle` 命令，支持本地或任意 [CI/CD 流水线](https://pushy.reactnative.cn/docs/api-token.md)             |
| **增量补丁体积**     | 公开协议未定义补丁下发，默认下发数 MB 完整 Bundle                   | **Hermes 字节码结构感知差量**：改一行代码仅 **3.4 KB**（[基准实测](https://github.com/sunnylqm/hbc-diff-benchmark)），首更即增量 |
| **国内 CDN 网络**  | 自行采购云存储与国内 CDN、处理备案与缓存刷新                         | **国内阿里云 CDN + 海外 Cloudflare 智能分流**，流量全包                                                              |
| **异常回滚与救砖**    | 需自行实现 `rollBackToEmbedded` 下发逻辑；仅首屏渲染前致命错误可客户端回退 | 启动崩溃自动回滚 + 后台一键改绑 + **原生冷启动强制启动（救砖）**                                                                |
| **按比例灰度发布**    | 需自行开发设备分桶与状态管理                                   | 内置百分比稳定灰度，可与全量版本并存                                                                                   |
| **可视化后台与报错监控** | 需自行开发                                            | 内置[版本漏斗分析](https://pushy.reactnative.cn/docs/analytics.md)与**免费 Sourcemap JS 报错还原**                  |
| **支持平台**       | iOS、Android                                      | **iOS、Android、鸿蒙 HarmonyOS NEXT**                                                                    |
| **综合成本**       | 云服务器 + 数据库 + CDN 流量费 + 前后端研发维护人力                 | 免费版起步；付费版 **¥960/年**起（专业版 ¥7,200/年含百万日查），¥0 流量超额费                                                    |

## 把现有 Expo 项目切到 Pushy 只需四步

相比花数周自研并长期背负一套更新服务器的值班压力，把 Expo 项目的 OTA 模块切到 Pushy 通常半天内即可跑通：

1. 卸载 `expo-updates`，安装 `react-native-update` 与全局 CLI（`npm i -g react-native-update-cli`），运行 `npx expo prebuild`（Expo SDK 50+ 自动接管双端 Bundle URL，无需手改原生入口）；
2. 将业务代码中的 `Updates.checkForUpdateAsync()` / `Updates.fetchUpdateAsync()` 替换为 `<UpdateProvider>` 策略或 `useUpdate()` Hook；
3. 用本地或 EAS Build 打出 Release 安装包，执行 `pushy uploadIpa / uploadApk / uploadAab` 登记原生基准包；
4. 日常迭代执行 `pushy bundle` 秒级下发几 KB 的增量更新。

完整步骤与 Expo Router 入口说明请阅读 **[Expo 项目热更新：Pushy 与 EAS Update 对比及接入](https://pushy.reactnative.cn/docs/expo.md)**。

## 常见问题

### EAS Update 官方服务端支持私有化部署吗？

不支持直接私有化部署 EAS Update 本身，但 Expo 开放了客户端协议，允许 `expo-updates` 连接遵循 Expo Updates Protocol v1 的自定义服务器。不过官方示例仓库仅用于教学演示，生产环境所需的存储、鉴权、灰度、回滚和监控都需要自行补齐。

### 自建 Expo Updates 服务器能下发差量补丁吗？

公开的 Expo Updates 协议规范目前没有包含差量补丁协商与合并标准；EAS Update 的 bsdiff 差量能力属于 Expo 官方托管服务的专有实现。因此常规自建方案每次都会下发完整的编译后 Bundle。

### Pushy 支持私有化部署吗？

支持。标准公有云套餐已包含国内外高速 CDN 且免流量费；若金融、政企等客户因数据合规要求必须将服务端部署在自有服务器或私有云内，可发送邮件至 `hi@charmlot.com` 咨询商业私有化部署方案。客户端 SDK（MIT）与 CLI（BSD-3-Clause）代码均完全开源可审计。

### 移除 `expo-updates` 后还能继续用 EAS Build 和 Expo Router 吗？

完全可以。Pushy 只接管热更新（替代 `expo-updates`），与 Expo SDK 其余模块、Expo Router 以及云端编译服务 EAS Build 均无冲突。

## 相关阅读

- [Expo 项目热更新接入指南](https://pushy.reactnative.cn/docs/expo.md)
- [Expo（EAS Update）热更新价格详解与 Pushy 成本对比](https://pushy.reactnative.cn/expo-pricing-vs-pushy.md)
- [hot-updater vs Pushy](https://pushy.reactnative.cn/hot-updater-vs-pushy.md)
- [Pushy 价格方案](https://pushy.reactnative.cn/pricing.md)


### 联系我们

- [邮箱 hi@charmlot.com](mailto:hi@charmlot.com)
- QQ群 729013783
- [用户协议](/agreement/)
- [隐私政策](/agreement/#privacy)

### 选型与对比

- [CodePush 停服替代方案](/codepush-alternative)
- [Expo / EAS Update 价格对比](/expo-pricing-vs-pushy)
- [自建 Expo Updates 服务对比](/expo-updates-self-hosted-vs-pushy)
- [hot-updater vs Pushy](/hot-updater-vs-pushy)
- [Revopush vs Pushy](/revopush-vs-pushy)
- [Stallion vs Pushy](/stallion-vs-pushy)

### 核心指南

- [React Native 热更新全面指南](/react-native-ota-updates)
- [从 CodePush 迁移](/docs/migrate-from-codepush)
- [Expo 项目热更新接入](/docs/expo)
- [React Native 新架构（0.82+）](/docs/new-architecture)
- [鸿蒙 HarmonyOS 热更新](/docs/harmony)
- [Android 多渠道与 AAB 热更新](/docs/android-channels-and-aab)
- [原生 App 混编（Brownfield）](/docs/brownfield)

### 文档与支持

- [快速开始](/docs/getting-started)
- [CI/CD 自动发布](/docs/cicd)
- [热更新排障指南](/docs/troubleshooting)
- [数据分析与报错监控](/docs/analytics)
- [常见问题](/docs/faq)
- [更新日志](/docs/changelog)
- [Issue 讨论区](https://github.com/reactnativecn/react-native-update/issues)
- [llms.txt](/llms.txt)

### 生态链接

- [React Native 中文网](https://reactnative.cn/)
- [Cresc（全球国际版）](https://cresc.dev/)
- [ReactJS 中文文档](https://zh-hans.react.dev/)

React Native 中文网 © 2026 武汉青罗网络科技有限公司

|

[鄂ICP备20002031号-3](https://beian.miit.gov.cn/)[![公安备案图标](https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png)鄂公网安备 42011202001821号](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001821)