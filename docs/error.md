---
order: 14
title: 常见报错
type: 开发指南
---

#### iOS报错 Unable to execute JS call: __fbBatchedBridge is undefined

如果直接修改了jsCodeLocation，将不能在iOS模拟器上运行。可以使用真机测试。要在发布之前测试热更新功能，可以用adhoc方式发布测试包并进行测试。adhoc发布的包可以用于uploadIpa和生成差异包。

#### XCode报错 "_BZ2_bzRead", referenced from 等

在工程target的Build Phases->Link Binary with Libraries中加入libz.tbd、libbz2.1.0.tbd


#### 报错 NDK not configured.

你需要下载并安装NDK，然后设置到环境变量`ANDROID_NDK_HOME`中。

#### 报错 Execution failed for task ':react-native-update:compileReleaseNdk'
参看 https://github.com/reactnativecn/react-native-pushy/issues/64#issuecomment-287967742
