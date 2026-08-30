> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Pushy - 专业的热更新解决方案

:::info
**现已全面支持鸿蒙系统以及 React Native 新架构！**
:::

Pushy (npm 包名: [`react-native-update`](https://www.npmjs.com/package/react-native-update)
 [![npm version](https://badge.fury.io/js/react-native-update.svg)](https://www.npmjs.com/package/react-native-update)) 是面向 React Native 应用提供的**专业热更新服务**
，由 [React Native 中文网](https://reactnative.cn)
独家研发并持续维护。我们致力于为全球 React Native 开发者提供最快速、最稳定、最经济的热更新体验。
:::tip 推荐接入方式
如果你正在使用支持 Skills 的 AI 编程工具，推荐优先阅读 [安装与使用 Skill](/docs/skills.md)，先安装 `react-native-update` Skill，再让 AI 根据你的项目结构自动完成大部分接入改动。手动文档更适合混编项目、monorepo 或需要逐项校对的场景。
:::

## 🚀 为什么选择 Pushy？

### 极致的更新体验

- **🎯 超小更新包**：基于 bsdiff/hdiff 算法的增量更新，通常只需**几十至几百 KB**（相比其他全量更新服务的几十 MB）；针对 Hermes 字节码的**独家深度优化**更可把一行文案的热修复压到 **3.4 KB**——比全量更新省 99.8% 的流量（见下方实测数据）
- **⚡️ 极速分发**：国内用户使用阿里云高速 CDN，国外用户智能分流至 Cloudflare，在各地区都使用覆盖率最好的 CDN 服务商，更新成功率高达 **99.9%+**
- **🛡️ 安全可靠**：内置崩溃回滚机制，出现问题自动回退，确保应用稳定运行
- **🌐 全平台覆盖**：完美支持 <span style={{whiteSpace: 'nowrap'}}><AppleOutlined style={{fontSize: '16px', color: '#555', marginRight: '6px'}} /> **iOS**</span> <span style={{whiteSpace: 'nowrap'}}><AndroidOutlined style={{fontSize: '16px', color: '#3DDC84', marginRight: '6px'}} /> **Android**</span>, 且业内独家第一方支持 <span style={{whiteSpace: 'nowrap'}}><HarmonyOSOutlined style={{fontSize: '16px', color: '#000', marginRight: '6px'}} /> **鸿蒙（HarmonyOS）**</span>
- **🔍 深耕 React Native 生态**：
  - ✅ **Expo** - 无缝集成
  - ✅ **新架构** - 第一时间跟进支持
  - ✅ **Hermes** - 完整支持字节码格式
- **📖 核心逻辑完全开源**：客户端、命令行工具以及管理界面代码都[完全开源](https://github.com/reactnativecn)，接受社区审计，代码透明可信，你可以随时迁移到自建服务器或其他服务
- **📊 发布全程可控**：后台自带**版本统计、按比例灰度发布、健康度监控**，每次发布的覆盖进度和稳定性一目了然，无需自建数据链路
- **🔒 数据安全**：可以自行插入数据埋点，完全掌控自己的数据
- **💬 专业人工支持**：提供付费专人技术支持，有问必答，确保你的应用稳定运行
- **🏆 多年稳定运营**：从 2016 年开始运营至今，服务众多知名企业和应用

### 📊 实测数据：针对 Hermes 深度优化的增量算法

Hermes 字节码在两个层面上都对通用二进制 diff 极不友好，Pushy 把两者一并消除，收益叠加：

- Hermes **每次编译都会重排字符串表**，JS 改一行就会让大部分字符串 ID 重新编号，两份几乎相同的字节码于是处处不同。Pushy 会以同一应用更早的一份字节码为基准编译，把这些 ID 钉死在原位，只有真正的改动才会进入 diff。
- Hermes 字节码中还充&#x6EE1;**"偏移量表"**，中间插入几个字节就会让其后所有偏移整体位移。Pushy 独家引入 **HBC（Hermes 字节码）结构感知的可逆变换**，从根源上消除这种放大。

在真实 React Native 0.86 应用上的实测结果（字节码约 4.4 MB，[评测代码与数据完全公开可复现](https://github.com/sunnylqm/hbc-diff-benchmark)）：

| 迭代场景            | 全量更新   | 传统增量（bsdiff） | Pushy 增量（Hermes 专项优化） |
| --------------- | ------ | ------------ | --------------------- |
| 修改一行文案          | 1.9 MB | 93.7 KB      | **3.4 KB**（小 28 倍）    |
| 新增小功能（约 60 行）   | 1.9 MB | 411.6 KB     | **50.2 KB**（小 8.2 倍）  |
| 新增中等功能（约 300 行） | 1.9 MB | 551.6 KB     | **97.8 KB**（小 5.6 倍）  |

- 一行文案的热修复只需下发 **3.4 KB**——比全量更新少 **99.8%**，比传统 bsdiff 增量**小 28 倍**
- **改动越小、收益越大**——恰好是热修复中最高频的场景
- **应用侧无需任何改动**：两项优化都发生在构建期，已上架的应用从下一次发版起自动受益
- 安全兜底：每次构建都会与未优化的产物比对校验，任何不匹配自动回退；Hermes 版本升级时**客户端零改动**自动兼容

## 💰 性价比之选

相比同类服务，Pushy 不仅功能更强大，价格也更亲民：

| 对比项       | Pushy        | Expo Update |
| --------- | ------------ | ----------- |
| **起步价**   | ¥66/月        | \~¥136/月    |
| **流量计费**  | 不单独计费        | 超出需额外付费     |
| **更新包大小** | 几十至几百 KB（增量） | 几十 MB（全量）   |
| **国内速度**  | ⭐⭐⭐⭐⭐ 极快     | ⭐⭐ 较慢       |
| **鸿蒙支持**  | ✅ 支持         | ❌ 不支持       |

:::warning
**注意**：Microsoft App Center（Code Push）已于 2025 年 3 月 31 日正式停止服务。如果你正在使用 Code Push，现在正是迁移到 Pushy 的最佳时机！
:::

使用 Pushy 后，你的团队将获得：

- ✅ **节省 90% 以上的流量成本**
- ✅ **发版速度提升 10 倍以上**（无需等待应用商店审核）
- ✅ **Bug 修复时间缩短至分钟级**
- ✅ **用户更新率提升至 99%+**（相比应用商店的自然更新率）
- ✅ **开发迭代更加灵活自由**

### 简单易用

```js
// 三行代码即可集成
import { UpdateProvider, Pushy } from "react-native-update";

const pushyClient = new Pushy({ appKey });

<UpdateProvider client={pushyClient}>
  <App />
</UpdateProvider>
```

内置多种更新策略，开箱即用：

- 🔕 **静默更新** - 后台自动下载，用户无感知
- 💬 **提示更新** - 友好的系统弹窗提醒
- ⚙️ **自定义策略** - 完全可控的更新流程

## 🚦 开始使用

推荐按下面的顺序完成接入：

1. **[安装与使用 Skill](/docs/skills.md)** - 推荐先让 AI 自动完成接入改造
2. **[安装配置](/docs/getting-started.md)** - 补齐依赖与原生侧配置
3. **[代码集成](/docs/integration.md)** - 校对或手动定制 `UpdateProvider` 接入
4. **[发布更新](/docs/publish.md)** - 一条命令推送新版本

:::info
不确定是否适合你的项目？查看[常见问题](/docs/faq.md)或者可以去[issues 区](https://github.com/reactnativecn/react-native-update/issues)或 QQ 群 729013783 提问，或给我们发[邮件](mailto:hi@charmlot.com)。
:::

立即开始使用 Pushy，让你的 React Native 应用拥有极致的热更新体验！
