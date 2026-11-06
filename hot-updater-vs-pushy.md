> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# hot-updater vs Pushy：开源自建与托管式 React Native 热更新对比

[hot-updater](https://hot-updater.dev) 与 Pushy 都是 CodePush 停服后活跃演进的 React Native 热更新方案，但两者在架构取舍上走向了两个明确的方向：**hot-updater 提供开源全栈代码，由你在自己的云账号里部署存储、数据库和边缘函数；Pushy 则把服务端、差量计算引擎与国内外双 CDN 全部托管好，按固定套餐开箱即用**（同时保持客户端 SDK 与 CLI 开源）。

> 本文关于 hot-updater 的信息核对自其官方文档与 GitHub 仓库（截至 2026 年 10 月）。如有更新欢迎发邮件至 `hi@charmlot.com` 指正。

## 一句话选型建议

- **选择 hot-updater**：如果你要求所有构建产物与数据库都运行在团队自己掌控的 AWS、Supabase、Cloudflare 或自有云账号内，且团队有后端与运维精力长期维护这套基础设施。
- **选择 Pushy**：如果你不想为热更新额外增加一个需要 7×24 值班的线上服务、主要用户包含中国大陆（需要稳定的国内阿里云 CDN）、追求极致的 Hermes 增量体积（一行改动 3.4 KB），或者需要同时支持 iOS、Android 与**鸿蒙 HarmonyOS NEXT**。

## 核心能力逐项对比

| 对比维度            | hot-updater                                                               | Pushy（`react-native-update`）                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **部署模式**        | **纯自托管**：通过 CLI 在你自己的 Cloudflare、Supabase、Firebase、AWS 等云账号中开通存储、数据库与边缘函数 | **全托管开箱即用**（含国内外高速 CDN）；亦提供按需报价的商业私有化部署版本                                                                                                                        |
| **开源协议**        | MIT（服务端与控制台在对第三方提供托管服务时附加署名条款）                                            | 客户端 SDK（MIT）、CLI（BSD-3-Clause）与管理后台前端开源                                                                                                                          |
| **软件与云费用**      | 软件免费；你自行向云厂商支付对象存储、数据库、函数计算与 CDN 出网流量费                                    | 提供免费版；付费版 **¥960/年**起（专业版 ¥7,200/年含 100 万次日查），**CDN 流量全包无超额账单**                                                                                                  |
| **Hermes 增量算法** | 对变更的 Hermes bundle 默认使用普通 bsdiff（其余变更文件全量下载）                              | **Hermes 字节码结构感知差量**：改一行代码仅 **3.4 KB**，普通 bsdiff 则需 93.7 KB（[公开基准实测](https://github.com/sunnylqm/hbc-diff-benchmark)）                                            |
| **中国大陆网络体验**    | 取决于所选云厂商；默认的 Cloudflare / Supabase / Firebase 在国内直连普遍存在延迟高或连通率波动问题        | **国内阿里云高速 CDN + 海外 Cloudflare 智能分流**，无需自行折腾域名备案与跨境加速                                                                                                             |
| **崩溃自动回滚与救砖**   | 支持首屏渲染前崩溃自动回滚                                                             | 启动崩溃自动回滚 + **原生冷启动独立检测与强制启动（救砖）**                                                                                                                                |
| **灰度发布**        | 支持（百分比、分群、Channel）                                                        | 支持（按设备 UUID 稳定百分比灰度，可与全量版本并存）                                                                                                                                    |
| **支持平台**        | iOS、Android                                                               | **iOS、Android、鸿蒙 HarmonyOS NEXT**                                                                                                                                |
| **Expo 兼容**     | 支持（通过 prebuild，不支持 Expo Go）                                               | 支持（Expo SDK 50+ prebuild 自动配置双端 Bundle URL）                                                                                                                      |
| **CodePush 迁移** | 自有 API，需重写接入层                                                             | 自有 API，提供完整的 [CodePush API 与命令逐一对照指南](https://pushy.reactnative.cn/docs/migrate-from-codepush.md) 及 [AI 自动迁移 Skill](https://pushy.reactnative.cn/docs/skills.md) |
| **JS 报错源码还原**   | 未内置                                                                       | **免费内置**，自动使用归档 Sourcemap 还原压缩堆栈                                                                                                                                 |
| **线上故障谁来值班**    | 你自己的研发/运维团队                                                               | Pushy 团队（付费版另配专人技术支持）                                                                                                                                            |

## “免费开源自建”背后的真实成本账

hot-updater 没有软件授权费，但“软件免费”并不等于“总拥有成本为零”，费用实际上转移到了云账单和研发工时上：

1. **云资源与国内网络改造成本**：你需要同时维护对象存储、元数据库、更新检查边缘函数与 CDN。如果用户在国内，直接使用海外 Serverless 平台（如 Cloudflare Workers + R2 或 Supabase）容易遇到弱网超时；若改用国内云厂商，则需自行完成适配、域名 ICP 备案及 CDN 流量包采购。
2. **下载带宽放大效应**：在云账单中随用户规模增长最快的是 CDN 出网流量。Pushy 在对比 Hermes 字节码前先固定字符串表并做 HBC 结构感知变换，一行热修复补丁仅 **3.4 KB**，比传统 bsdiff（**93.7 KB**）小 28 倍——同等发版频率下大幅节省用户蜂窝流量与分发带宽。
3. **长期运维与值班负担**：服务端版本升级、数据库迁移、证书续期以及发版高峰期的可用性监控都需要专人负责。

相比之下，Pushy 标准版仅 **¥960/年（¥80/月）**，支持百万级日检查量的专业版为 **¥7,200/年（¥600/月）**，阿里云与 Cloudflare CDN 流量全部包含在内，且超出当日查询配额时仅暂停返回新更新直至次日零点重置，绝不会产生天价云流量账单。详见 [价格方案](https://pushy.reactnative.cn/pricing.md)。

## 什么时候选 hot-updater，什么时候选 Pushy？

**更适合选择 hot-updater：**

- 团队明确要求零软件采购预算、所有服务端代码与数据必须跑在自有云账号中；
- 团队已经在熟练运维其支持的云厂商栈，且应用主要面向海外网络环境；
- 你希望对服务端源码做深度二次开发定制。

**更适合选择 Pushy：**

- 希望几分钟内接入稳定可用的热更新，不把珍贵的客户端研发精力消耗在运维更新后端上；
- 应用有大量中国大陆用户，需要开箱即用的国内高速 CDN 与高到达率；
- 使用 Hermes 引擎，希望把紧急热修复补丁压到几 KB 级别；
- 同时开发或规划了**鸿蒙 HarmonyOS NEXT（RNOH）**&#x7AEF;；
- 希望在同一个控制台里同时获得版本漏斗统计、崩溃回滚、原生救砖与 JS Sourcemap 报错还原。

## 常见问题

### hot-updater 提供官方托管云服务吗？

不提供。hot-updater 是一个需要你自行部署的开源工具链，通过其 CLI 将存储、数据库与检查函数部署到你自己的云服务商账号或自建服务器上。

### hot-updater 和 Pushy 都支持差量补丁，为什么体积差距这么大？

两者都做二进制差分，区别在于对 Hermes 字节码（`.hbc`）的预处理。Hermes 每次重新编译都会重排全局字符串表并引起大量跳转偏移量位移，直接跑通用 bsdiff 会把几字节的源码修改放大成近百 KB 的差异。Pushy 在编译与差分前消除了这两类噪声，因此在公开基准测试中一行改动仅需 **3.4 KB**（普通 bsdiff 为 **93.7 KB**）。

### Pushy 的代码也是开源的吗？能私有化部署吗？

Pushy 的客户端 SDK `react-native-update`（MIT）、命令行工具 `react-native-update-cli`（BSD-3-Clause）和管理端前端均在 [GitHub](https://github.com/reactnativecn/react-native-update) 开源，代码透明可审计。有内网隔离或私有云部署需求的企业，也可联系 `hi@charmlot.com` 获取官方商业支持的私有化服务端部署方案。

### Pushy 支持鸿蒙（HarmonyOS NEXT）吗？

第一方原生支持。基于 RNOH 构建的鸿蒙应用可以使用与 iOS、Android 完全一致的 CLI 命令、灰度策略与崩溃回滚机制，详见[鸿蒙 React Native 热更新](https://pushy.reactnative.cn/docs/harmony.md)。

## 相关阅读

- [App Center 与 CodePush 停服替代方案对比](https://pushy.reactnative.cn/codepush-alternative.md)
- [自建 Expo Updates 服务器 vs Pushy](https://pushy.reactnative.cn/expo-updates-self-hosted-vs-pushy.md)
- [Revopush vs Pushy](https://pushy.reactnative.cn/revopush-vs-pushy.md) · [Stallion vs Pushy](https://pushy.reactnative.cn/stallion-vs-pushy.md)
- [Pushy 产品简介与实测数据](https://pushy.reactnative.cn/docs/intro.md) · [价格方案](https://pushy.reactnative.cn/pricing.md)


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