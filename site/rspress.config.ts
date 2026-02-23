import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  root: path.join(__dirname, 'pages'),
  title: 'Pushy 极速热更新',
  description: 'Pushy 极速热更新',
  icon: '/images/logo.svg',
  logo: {
    light: '/images/logo.svg',
    dark: '/images/logo.svg',
  },
  logoText: 'Pushy 极速热更新',
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/reactnativecn/react-native-update' },
    ],
    darkMode: false,
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/intro', activeMatch: '^/docs/' },
      { text: '价格', link: '/pricing' },
      { text: '常见问题', link: '/docs/faq' },
      { text: '登录', link: 'https://pushy-admin.reactnative.cn/#/user' },
      { text: '注册', link: 'https://pushy-admin.reactnative.cn/#/register' },
    ],
    sidebar: {
      '/docs/': [
        {
          text: '快速入门',
          items: [
            { text: '产品简介', link: '/docs/intro' },
            { text: '安装配置', link: '/docs/getting-started' },
            { text: '代码集成', link: '/docs/integration' },
            { text: '发布流程', link: '/docs/publish' },
          ],
        },
        {
          text: '高阶用法',
          items: [
            { text: 'API 文档', link: '/docs/api' },
            { text: 'API Token', link: '/docs/api-token' },
            { text: '命令行工具（内置）', link: '/docs/cli' },
            { text: '命令行工具（自定义模块）', link: '/docs/cli_module' },
            { text: '场景实践', link: '/docs/bestpractice' },
            { text: 'Skills 安装与使用', link: '/docs/skills' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: '常见问题', link: '/docs/faq' },
          ],
        }
      ],
    },
  },
  builderConfig: {
    plugins: [pluginSass()],
    html: {
      tags: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:keywords',
            content: '热更新,hotupdate,免审核,快速上架',
          },
        },
      ],
    },
  },
  plugins: [rspressPluginMermaid()],
});
