import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Pushy 极速热更新',
  description: 'React Native 热更新服务',
  outDir: 'out',
  icon: '/images/logo.svg',
  logo: '/images/logo.svg',
  logoText: 'Pushy',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/reactnativecn/react-native-update',
      },
    ],
  },
});
