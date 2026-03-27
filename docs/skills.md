# 推荐：先安装 Skill，再让 AI 自动集成

首次接入 Pushy 时，推荐先安装 `react-native-update` Skill，再让支持 Skills 的 AI 编程工具根据你的项目结构自动完成大部分集成改动。只有当工程结构特殊、需要精细控制，或者想逐项校对生成代码时，再回到后续手动文档。

## Skill 信息

- Skill 名称：`react-native-update`
- 源仓库：`reactnativecn/react-native-update-skill`

## 推荐工作流

1. 安装 `react-native-update` Skill。
2. 在 AI 工具中打开你的 React Native / Expo 项目根目录。
3. 直接提出接入需求，让 AI 根据现有工程自动改造。
4. 用 [安装配置](/docs/getting-started.md) 和 [代码集成](/docs/integration.md) 作为校对基线。

## 安装（推荐优先）

安装到当前环境支持的所有 Agent：

```bash
npx skills add reactnativecn/react-native-update-skill --skill react-native-update -a '*'
```

仅安装到 Claude Code：

```bash
npx skills add reactnativecn/react-native-update-skill --skill react-native-update -a claude-code
```

## 更新 Skill

```bash
npx skills check
npx skills update
```

## 可以直接这样对 AI 说

安装后，可以直接向 AI 助手提出接入需求，例如：

- 在 Expo 项目中接入 `react-native-update`
- 在 class 组件根节点中完成接入改造
- 保留当前导航和状态管理结构，自动包裹 `UpdateProvider`
- 配置白名单灰度发布策略
- 排查“热更新未生效”问题

## Skill 可自动协助的内容

- RN CLI / Expo 接入流程
- `update.json` 与 `appKey` 配置检查
- iOS / Android 关键改动提示
- 更新策略建议（`checkStrategy` / `updateStrategy`）
- 常见冲突排查（如 `expo-updates`）
- class 组件与白名单示例

## 何时改用手动文档

- 工程是混编原生项目、monorepo 或目录结构高度定制
- 自动 link 或原生构建本身已经异常，需要逐项定位
- 团队希望将 AI 生成结果与手动基线逐行比对

## 相关链接

- 仓库：
  <a href="https://github.com/reactnativecn/react-native-update-skill" target="_blank" rel="noopener noreferrer">
    [https://github.com/reactnativecn/react-native-update-skill](https://github.com/reactnativecn/react-native-update-skill)
  </a>
- ClawHub 页面（可选）：
  <a href="https://clawhub.ai/skills/react-native-update" target="_blank" rel="noopener noreferrer">
    [https://clawhub.ai/skills/react-native-update](https://clawhub.ai/skills/react-native-update)
  </a>
