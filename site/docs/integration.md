---
order: 1
title: 代码集成
type: 快速入门
---

安装配置完成后，确定应用编译顺利通过，下面我们来进行代码集成。

## 极简快速集成

我们从 v6.5.0 版本开始提供极简的一行式集成（老版本只能使用自定义集成方式）：

```js
import { simpleUpdate } from 'react-native-update';

// 整个应用的根组件
class App extends Component {}

// 对根组件使用simpleUpdate方法封装后导出
export default simpleUpdate(App);
```

此方式默认在 App 启动，以及从后台切换到前台时触发更新检查，弹出提示的内容也固定。如需自定义触发时机，以及修改界面提示等，请参考下面的自定义集成方式。

## 自定义集成

### 获取 appKey

检查更新时必须提供你的`appKey`，这个值保存在`update.json`中，并且根据平台不同而不同。你可以用如下的代码获取：

```javascript
import { Platform } from 'react-native';

import _updateConfig from './update.json';
const { appKey } = _updateConfig[Platform.OS];
```

如果你不使用 pushy 命令行，你也可以从网页端查看到两个应用 appKey，并根据平台的不同来选择。

### 检查更新、下载更新

异步函数[`checkUpdate`](api.html#async-function-checkupdateappkey)可以检查当前版本是否需要更新：

```javascript
const info = await checkUpdate(appKey);
```

返回的[`info`](api.html#async-function-checkupdateappkey)有三种情况：

1. `{expired: true}`：该应用原生包已过期（已从 pushy 服务器中删除），开发者应该在 pushy 控制台添加一个更新下载链接，并自行提示用户下载。

2. `{upToDate: true}`：当前已经更新到最新，无需进行更新。

3. `{update: true}`：当前有新版本可以更新。info 的`name`、`description`字段可以用于提示用户，而`metaInfo`字段则可以根据你的需求自定义其它属性(如是否静默更新、是否强制更新等等)。另外还有几个字段，包含了补丁包的下载地址等。 pushy 会首先尝试耗费流量更少的更新方式。将`info`对象传递给`downloadUpdate`方法作为参数即可。

```javascript
const hash = await downloadUpdate(
  info,
  // 下载回调为可选参数，从v5.8.3版本开始加入
  {
    onDownloadProgress: ({ received, total }) => {
      // 已下载的字节数, 总字节数
      console.log(received, total);
    },
  },
);
```

`downloadUpdate`方法从`v5.8.3`版本开始新增接受第二个可选参数，为下载进度的回调函数（`onDownloadProgress`）。可根据回调参数自行设计进度的展示。

### 切换版本

`downloadUpdate`的返回值是一个 hash 字符串，它是当前热更新版本的唯一标识。

你可以使用`switchVersion(hash)`函数立即切换版本(此时应用会立即重新加载)，或者选择调用 `switchVersionLater(hash)`，让应用在下一次启动的时候再加载新的版本。

### 首次启动、回滚

在每次更新完毕后的首次启动时，`isFirstTime`常量会为`true`。你必须在应用退出前合适的任何时机，调用`markSuccess`，否则应用下一次启动的时候将会进行回滚操作。这一机制称作“反触发”，这样当你应用启动初期即遭遇问题的时候，也能在下一次启动时恢复运作。

你可以通过`isFirstTime`来获知这是当前版本的首次启动，也可以通过`isRolledBack`来获知应用刚刚经历了一次回滚操作。你可以在此时给予用户合理的提示。

以上提及的所有 api 的说明文档可在[这里](api.html)查看。

### 完整的示例

```javascript
import React, { Component } from 'react';

import { StyleSheet, Platform, Text, View, Alert, TouchableOpacity, Linking } from 'react-native';

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
  downloadAndInstallApk,
} from 'react-native-update';

import _updateConfig from './update.json';
const { appKey } = _updateConfig[Platform.OS];

export default class MyProject extends Component {
  state = {
    received: 0,
    total: 0,
  };
  componentDidMount() {
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      console.log('更新完成');
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.');
    }
  }
  doUpdate = async (info) => {
    try {
      const hash = await downloadUpdate(info, {
        onDownloadProgress: ({ received, total }) => {
          this.setState({
            received,
            total,
          });
        },
      });
      if (!hash) {
        return;
      }
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {
          text: '是',
          onPress: () => {
            switchVersion(hash);
          },
        },
        { text: '否' },
        {
          text: '下次启动时',
          onPress: () => {
            switchVersionLater(hash);
          },
        },
      ]);
    } catch (err) {
      Alert.alert('更新失败', err.message);
    }
  };
  checkUpdate = async () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    let info;
    try {
      info = await checkUpdate(appKey);
    } catch (err) {
      Alert.alert('更新检查失败', err.message);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新，点击确定下载安装新版本', [
        {
          text: '确定',
          onPress: () => {
            if (info.downloadUrl) {
              // apk可直接下载安装
              if (Platform.OS === 'android' && info.downloadUrl.endsWith('.apk')) {
                downloadAndInstallApk({
                  url: info.downloadUrl,
                  onDownloadProgress: ({ received, total }) => {
                    this.setState({
                      received,
                      total,
                    });
                  },
                });
              } else {
                Linking.openURL(info.downloadUrl);
              }
            }
          },
        },
      ]);
    } else if (info.upToDate) {
      Alert.alert('提示', '您的应用版本已是最新.');
    } else {
      Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
        {
          text: '是',
          onPress: () => {
            this.doUpdate(info);
          },
        },
        { text: '否' },
      ]);
    }
  };
  render() {
    const { received, total } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎使用热更新服务</Text>
        <Text style={styles.instructions}>
          这是版本一 {'\n'}
          当前原生包版本号: {packageVersion}
          {'\n'}
          当前热更新版本Hash: {currentVersion || '(空)'}
          {'\n'}
        </Text>
        <Text>
          下载进度：{received} / {total}
        </Text>
        <TouchableOpacity onPress={this.checkUpdate}>
          <Text style={styles.instructions}>点击这里检查更新</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
```

现在，你的应用已经可以通过 pushy 服务检查版本并进行更新了。下一步，你可以开始尝试发布应用包和版本，请参阅[发布热更新](publish)。
