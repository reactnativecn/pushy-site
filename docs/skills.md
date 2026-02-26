# 安装与使用 Skill

本文介绍如何安装并使用 `react-native-update` 的 Skill，帮助你在 AI 编程工具中更高效地完成接入、配置与排查。

## Skill 信息

- Skill 名称：`react-native-update`
- 源仓库：`reactnativecn/react-native-update-skill`

## 安装（推荐）

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

## 使用方式

安装后，可以直接向 AI 助手提出接入需求，例如：

- 在 Expo 项目中接入 `react-native-update`
- 在 class 组件根节点中完成接入改造
- 配置白名单灰度发布策略
- 排查“热更新未生效”问题

## Skill 覆盖内容

- RN CLI / Expo 接入流程
- `update.json` 与 `appKey` 配置检查
- iOS / Android 关键改动提示
- 更新策略建议（`checkStrategy` / `updateStrategy`）
- 常见冲突排查（如 `expo-updates`）
- class 组件与白名单示例

## 相关链接

- 仓库：
  <a href="https://github.com/reactnativecn/react-native-update-skill" target="_blank">
    [https://github.com/reactnativecn/react-native-update-skill](https://github.com/reactnativecn/react-native-update-skill)
  </a>
- ClawHub 页面（可选）：
  <a href="https://clawhub.ai/skills/react-native-update" target="_blank">
    [https://clawhub.ai/skills/react-native-update](https://clawhub.ai/skills/react-native-update)
  </a>
