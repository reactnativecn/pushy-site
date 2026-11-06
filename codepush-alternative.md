> For AI agents: the complete documentation index is available at https://pushy.reactnative.cn/llms.txt, the full documentation bundle is available at https://pushy.reactnative.cn/llms-full.txt.

# App Center 与 CodePush 停服后的替代方案对比（2026）

微软已于 **2025 年 3 月 31 日**正式关停 Visual Studio App Center，托管版 **CodePush** 随之彻底停止服务。如果你的 React Native 应用里还保留着 `codePush.sync()`，它要么正在请求一个已经不存在的域名，要么连在一台需要你团队自己维护的自建服务器上。

与此同时，还有一条更容易被忽视的技术截止线：**React Native 0.82 起已强制运行在新架构（New Architecture）上**，`newArchEnabled=false` 不再生效；而已归档的 `react-native-code-push` 官方明确表示**不会支持新架构**。这意味着即使自建了 `code-push-server`，只要不替换客户端 SDK，项目就会被永久卡在 React Native 0.81 或更老的版本上。

## CodePush 退役现状核查

| 项目                                                                                        | 当前状态                                                     |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Visual Studio App Center（含托管版 CodePush）                                                   | **2025 年 3 月 31 日已正式关停**，API 与控制台均不可用                    |
| [`microsoft/react-native-code-push`](https://github.com/microsoft/react-native-code-push) | 2025 年 5 月归档只读（Archived），npm 最后一版停留在 `9.0.1`             |
| [`microsoft/code-push-server`](https://github.com/microsoft/code-push-server)             | 以 MIT 协议放出后随即归档只读，微软官方不提供任何维护、Issue 处理或安全补丁              |
| React Native 新架构（0.82+）兼容性                                                                | `react-native-code-push` **不支持**；升级 RN 0.82+ 必须更换客户端 SDK |

## 停服后的四条替代路线

### 1. 自建 `microsoft/code-push-server`（或社区分支）

将微软开源的独立服务端部署到自己的云服务器上，客户端只需把 `ServerUrl` 指向自建域名，现有业务代码几乎不用改。

- **代价**：你需要自行部署并长期维护 Node 服务、MySQL / Redis、对象存储和国内 CDN 加速与域名备案；仓库已归档无人维护；且**客户端依旧无法升级到 React Native 0.82+ 新架构**，Hermes 字节码下也没有结构感知差量优化，流量开销较大。
- **适用场景**：已进入维护期、不再升级 React Native 版本、偶尔只需发紧急修复的老旧应用。

### 2. 迁移到兼容 CodePush 协议的海外托管服务

部分海外厂商（如 [Revopush](https://pushy.reactnative.cn/revopush-vs-pushy.md)）维护了 `react-native-code-push` 的分支并托管兼容服务端，代码改动较小。

- **代价**：通常只面向 React Native 0.76+，按月活更新用户（MAU）和出网流量以美元计费，超出额度另收超额费；服务器与 CDN 针对海外网络设计，缺乏中国大陆节点优化、人民币对公结算与国内发票支持，也不支持鸿蒙（HarmonyOS NEXT）。
- **适用场景**：纯海外分发、已在 RN 0.76+ 且极度看重保留 `codePush.sync()` 原写法的团队。

### 3. 迁移到 Expo 官方 EAS Update

如果工程本身已经全面采用 Expo（且主要面向海外用户、月活规模较小），切换至 `expo-updates` 是顺理成章的路线。

- **代价**：纯 React Native CLI（Bare）工程需要先引入 `expo` 包与 Metro 改造；计费采用基础月费 + 按更新 MAU（$0.005/人起）+ 边缘带宽（$0.10/GiB）双表计费，用户量上涨后账单增长迅速（详见 [Expo 价格与 Pushy 对比](https://pushy.reactnative.cn/expo-pricing-vs-pushy.md)）；国内网络访问速度较慢，且不支持鸿蒙。

### 4. 迁移到持续维护的原生热更新服务 Pushy

Pushy（[`react-native-update`](https://github.com/reactnativecn/react-native-update)）自 2016 年起稳定运营至今，客户端 SDK 与 CLI 完全开源，发布心智与 CodePush 高度一致，同时补齐了现代 React Native 工程的核心诉求：

- **新旧架构与全平台通吃**：同时兼容旧架构与 [React Native 新架构（0.82+ / Bridgeless）](https://pushy.reactnative.cn/docs/new-architecture.md)，支持 **iOS、Android 与鸿蒙 HarmonyOS NEXT**，兼容 Expo SDK 50+ prebuild。
- **Hermes 字节码 KB 级增量**：针对每个登记的原生包计算 HBC 结构感知差量，改一行代码仅需下发 **3.4 KB**（[公开基准测试](https://github.com/sunnylqm/hbc-diff-benchmark)），应用上架后的第一次热更新即是差量包。
- **国内外高速 CDN 且流量全包**：国内走阿里云 CDN、海外走 Cloudflare，固定人民币套餐（免费版 ¥0，标准版 ¥960/年起），**无任何 CDN 流量费或超额账单**，支持对公转账与开具增值税发票。
- **更完善的线上安全与可观测性**：除了启动崩溃自动回滚、按比例灰度发布外，还提供 CodePush 没有的**原生冷启动强制启动（救砖）**、**版本健康度漏斗**与**免费内置的 Sourcemap JS 报错还原**。

## 核心能力与成本全景对比

| 对比维度             | Pushy（`react-native-update`）                 | 自建 `code-push-server`      | Expo EAS Update            | Revopush                     |
| ---------------- | -------------------------------------------- | -------------------------- | -------------------------- | ---------------------------- |
| **维护状态**         | **活跃维护（2016 至今）**                            | 已归档，停止维护                   | 活跃维护                       | 活跃维护                         |
| **RN 0.82+ 新架构** | **支持（含旧架构兼容）**                               | 不支持                        | 支持                         | 支持（需 RN 0.76+）               |
| **计费可预期性**       | **固定套餐，¥0 流量与超额费**                           | 云主机 + 数据库 + CDN 流量自付       | 按 MAU + 带宽超额计费             | 按 MAU + 带宽超额计费               |
| **付费起步档**        | **¥960/年**（折合 ¥80/月，1 万次日查）                  | 自购云资源 + 运维人力               | $19/月（限 3,000 MAU）         | $25/月（限 50,000 MAU / 100 GB） |
| **百万级规模档**       | **¥7,200/年**（折合 ¥600/月，100 万次日查）             | 随下载带宽线性上涨                  | $199/月基础费（仅含 5 万 MAU，超出另计） | $500/月（100 万 MAU / 5 TB）     |
| **Hermes 增量体积**  | **3.4–98 KB（HBC 结构感知差量）**                    | 较大（无字节码结构优化）               | SDK 55+ 支持普通 bsdiff        | RN 0.76+ 字节级 diff            |
| **中国大陆 CDN**     | **阿里云高速 CDN（内置全包）**                          | 需自行备案配置国内 CDN              | 海外节点，国内较慢                  | 海外节点                         |
| **崩溃回滚与救砖**      | **启动崩溃自动回滚 + 原生冷启动救砖**                       | 依赖 `notifyAppReady` 回滚，无救砖 | 首屏渲染前异常回退                  | 沿用 `notifyAppReady` 模型       |
| **JS 报错源码还原**    | **免费内置 Sourcemap 还原**                        | 无                          | 需另购 Sentry 等服务             | 需对接 Sentry                   |
| **鸿蒙 HarmonyOS** | **第一方支持**                                    | 不支持                        | 不支持                        | 不支持                          |
| **私有化 / 海外合规**   | 支持大客户定制；海外独立主体可选 [Cresc](https://cresc.dev/) | 自行维护                       | 绑定 EAS 云服务                 | 企业定制                         |

## 从 CodePush 迁移到 Pushy 需要几步？

业务组件代码无需重写，迁移只需在一个新的原生版本周期内完成以下四步：

1. **移除 `react-native-code-push` 并接入 `react-native-update`**：将 iOS `CodePush.bundleURL()` 替换为 `RCTPushy.bundleURL()`，Android `CodePush.getJSBundleFile()` 替换为 `UpdateContext.getBundleUrl()`，根组件改用 `<UpdateProvider>` 包裹（可使用 [`react-native-update` AI Skill](https://pushy.reactnative.cn/docs/skills.md) 自动完成改造）。
2. **创建应用并上传上架原生包**：执行 `pushy createApp` 生成 `update.json`，打出 Release 包后运行 `pushy uploadIpa` / `pushy uploadApk` / `pushy uploadAab` 登记原生基准版本。
3. **改造 CI 发布脚本**：用 `pushy bundle` 配合 [API Key](https://pushy.reactnative.cn/docs/api-token.md) 替换原先的 `appcenter codepush release-react`。
4. **扫码验证并按比例灰度放量**：用后台二维码真机验证无误后，从 10% 灰度逐步推至全量。

完整的概念映射表、`codePush.sync()` / `InstallMode` / `notifyAppReady` 逐项代码对照及命令替换清单，请直接查阅 **[从 CodePush 迁移到 Pushy 实操指南](https://pushy.reactnative.cn/docs/migrate-from-codepush.md)**。

## 常见问题

### App Center 停服后，老版本用户手机上的 CodePush 还能直接切到 Pushy 吗？

不能通过热更新直接切换。热更新 SDK 包含原生代码，已经安装在用户手机上的旧版应用仍运行着 CodePush 原生模块。正确做法是发布一个集成了 `react-native-update` 的新原生版本上架应用商店；新版本用户自动由 Pushy 托管热更新，存量旧包随自然升级或应用内升级提示逐步淘汰。

### 迁移到 Pushy 需要重写原有的检查更新弹窗逻辑吗？

不需要。如果原先使用默认静默或弹窗策略，配置 `checkStrategy` 和 `updateStrategy` 即可开箱即用；如果原先基于 `codePush.checkForUpdate()` 编写了自定义进度条弹窗，只需将对应调用替换为 `useUpdate()` Hook 返回的 `checkUpdate`、`downloadUpdate`、`progress` 和 `switchVersion`，详见[迁移指南中的客户端 API 对照表](https://pushy.reactnative.cn/docs/migrate-from-codepush.md#%E5%AE%A2%E6%88%B7%E7%AB%AF-api)。

### CodePush 里的 `Staging` 和 `Production` 双环境在 Pushy 中怎么对应？

Pushy 每个平台只需一个 `appKey`，无需在工程里维护多套 Deployment Key：提测阶段直接用管理后台生成的**测试二维码（Deep Link）**&#x5728;正式 Release 包上扫码加载待测版本，完全隔离线上用户；上线阶段通过 `--rollout` **百分比灰度**先覆盖小比例真实设备，观察[版本健康度与报错](https://pushy.reactnative.cn/docs/analytics.md)正常后再提升至 100%。

### 如果公司合规要求服务端必须私有化部署或使用海外主体签约怎么办？

Pushy 客户端、CLI 与管理前端均已在 GitHub 开源。如需在内网或自有云环境部署完整服务端，可发邮件至 `hi@charmlot.com` 洽谈私有化部署方案；如为出海业务需要新加坡公司主体签约与美元计费，可直接使用同源国际版服务 [Cresc](https://cresc.dev/)。

## 相关阅读

- [从 CodePush 迁移到 Pushy（完整 API 与命令对照）](https://pushy.reactnative.cn/docs/migrate-from-codepush.md)
- [React Native 新架构（0.82+）热更新指南](https://pushy.reactnative.cn/docs/new-architecture.md)
- [Expo（EAS Update）价格与 Pushy 成本对比](https://pushy.reactnative.cn/expo-pricing-vs-pushy.md)
- [hot-updater vs Pushy](https://pushy.reactnative.cn/hot-updater-vs-pushy.md) · [Revopush vs Pushy](https://pushy.reactnative.cn/revopush-vs-pushy.md) · [Stallion vs Pushy](https://pushy.reactnative.cn/stallion-vs-pushy.md)
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