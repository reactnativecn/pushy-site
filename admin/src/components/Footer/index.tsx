import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 武汉青罗网络科技有限公司`}
    links={[
      {
        key: 'Pushy热更新',
        title: 'Pushy热更新',
        href: 'https://pushy.reactnative.cn',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/reactnativecn/react-native-pushy',
        blankTarget: true,
      },
      {
        key: 'React Native 中文网',
        title: 'React Native 中文网',
        href: 'https://reactnative.cn',
        blankTarget: true,
      },
    ]}
  />
);
