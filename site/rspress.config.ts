import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';

export default defineConfig({
  llms: true,
  outDir: 'out',
  root: path.join(__dirname, 'pages'),
  title: 'Pushy 极速热更新',
  description:
    'Pushy —— 为 React Native 打造的热更新服务。KB 级增量包、CDN 秒级分发、崩溃自动回滚，让每一次发布秒级抵达用户，无需等待应用商店审核。',
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
    llmsUI: {
      viewOptions: ['markdownLink', 'chatgpt', 'claude'],
      placement: 'outline',
    },
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
            { text: '推荐：Skills 自动集成', link: '/docs/skills' },
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
            { text: '命令行工具', link: '/docs/cli' },
            { text: '场景实践', link: '/docs/bestpractice' },
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
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: '/manifest.webmanifest',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'theme-color',
            content: '#0f5fff',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'apple-mobile-web-app-title',
            content: 'Pushy',
          },
        },
        {
          // Inline (not SW-interceptable) dev-only cleanup: unregister any
          // previously installed service worker and drop its caches, so dev
          // pages can never get stuck on a stale cached bundle.
          tag: 'script',
          append: false,
          children:
            "(function(){var h=location.hostname;if(h!=='localhost'&&h!=='127.0.0.1'&&h!=='::1'&&h!=='[::1]')return;if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})})}if('caches' in window){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k)})})}})();",
        },
        {
          tag: 'script',
          attrs: {
            src: '/register-pwa.js',
            defer: true,
          },
        },
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
