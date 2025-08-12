---
order: 12
title: 命令行工具（自定义模块）
type: 开发指南
---

## 模块化功能 (Module System)

从 v2.0.0 版本开始，CLI 支持模块化扩展，允许开发者自定义命令和工作流。

### 核心概念

- **CLI Module**: 包含自定义命令和工作流的模块
- **Command**: 单个可执行的命令
- **Workflow**: 由多个步骤组成的复杂工作流
- **Module Manager**: 管理模块注册和执行的核心组件

### 模块注册

```typescript
import { moduleManager } from 'react-native-update-cli';
import { myCustomModule } from './my-custom-module';

// 注册自定义模块
moduleManager.registerModule(myCustomModule);
```

### 创建自定义模块

```typescript
import type { CLIModule, CommandContext, CommandResult } from 'react-native-update-cli';

export const myCustomModule: CLIModule = {
  name: 'my-module',
  version: '1.0.0',
  commands: [
    {
      name: 'my-command',
      description: '我的自定义命令',
      handler: async (context: CommandContext): Promise<CommandResult> => {
        // 命令执行逻辑
        return { success: true, data: 'Hello from custom command!' };
      },
      options: {
        flag: {
          hasValue: true,
          description: '自定义参数'
        }
      }
    }
  ],
  workflows: [
    {
      name: 'my-workflow',
      description: '我的自定义工作流',
      steps: [
        {
          name: 'step1',
          description: '第一步',
          execute: async (context: CommandContext) => {
            console.log('执行第一步...');
            return { step1Result: 'completed' };
          }
        },
        {
          name: 'step2',
          description: '第二步',
          execute: async (context: CommandContext, previousResult: any) => {
            console.log('执行第二步，前一步结果:', previousResult);
            return { ...previousResult, step2Result: 'completed' };
          }
        }
      ]
    }
  ],
  init: (provider) => {
    console.log('模块初始化完成');
  }
};
```

### 查看已注册模块命令

```bash
# 查看所有可用模块命令
pushy list
```

---

## 工作流系统 (Workflow System)

工作流是由多个步骤组成的复杂任务执行流程，支持条件执行、错误处理和结果传递。

### 内置工作流

#### 1. 用户认证工作流

##### pushy auth-check
检查用户认证状态

```bash
pushy workflow auth-check
```

##### pushy login-flow  
完整的用户登录流程

```bash
pushy workflow login-flow
```

#### 2. 应用管理工作流

##### pushy workflow multi-platform-app-management
跨平台应用统一管理

```bash
pushy workflow multi-platform-app-management
```

##### pushy workflow incremental-build
增量构建工作流，生成差异更新包

```bash
pushy workflow incremental-build
```

### 工作流管理命令

列出所有可用工作流

```bash
pushy list
```

##### pushy workflow
执行指定工作流

```bash
pushy workflow <workflowName>
```

##### pushy list
列出所有已注册的模块

```bash
pushy list
```

### 工作流特性

1. **步骤化执行**: 工作流由多个步骤组成，按顺序执行
2. **结果传递**: 每个步骤的结果可以传递给下一个步骤
3. **条件执行**: 支持根据条件决定是否执行某个步骤
4. **错误处理**: 内置错误处理和回滚机制
5. **进度反馈**: 实时显示执行进度和状态
6. **参数验证**: 执行前自动验证必需参数

---

## 示例项目

在项目的 `example/` 目录中提供了完整的模块和工作流使用示例：

- `example/modules/` - 自定义模块示例
- `example/workflows/` - 自定义工作流示例  
- `example/scripts/` - 使用脚本示例

运行示例：

```bash
# 模块注册和执行示例
npx ts-node example/scripts/register-modules.ts

# 工作流演示
npx ts-node example/scripts/workflow-demo.ts

# 增强工作流演示
npx ts-node example/scripts/enhanced-workflow-demo.ts
```
