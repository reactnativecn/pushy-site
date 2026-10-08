import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';

const SITE_ORIGIN = 'https://pushy.reactnative.cn';
const OG_IMAGE = `${SITE_ORIGIN}/images/og.jpg`;

const SOFTWARE_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pushy',
  alternateName: ['Pushy 极速热更新', 'react-native-update'],
  url: `${SITE_ORIGIN}/`,
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'iOS, Android, HarmonyOS',
  description:
    '为 React Native 打造的热更新服务：KB 级增量包、CDN 秒级分发、崩溃自动回滚，无需等待应用商店审核。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
  sameAs: [
    'https://github.com/reactnativecn/react-native-update',
    'https://www.npmjs.com/package/react-native-update',
  ],
});

/** Markdown answer → plain text for structured data. */
function plainText(markdown: string) {
  return markdown
    .replace(/^:::.*$/gm, '')
    .replace(/^\|?\s*-+\s*(\|\s*-+\s*)*\|?$/gm, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*>|]/g, ' ')
    .replace(/^\s*(?:-|\d+\.)\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// FAQPage JSON-LD built from the "#### question" sections of the FAQ page, so
// AI search engines can quote a question's answer directly.
const FAQ_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: fs
    .readFileSync(path.join(__dirname, 'pages/docs/faq.mdx'), 'utf8')
    .split(/^#### /m)
    .slice(1)
    .map((section) => {
      const [question, ...rest] = section.split('\n');
      const answer = rest.join('\n').split(/^(?:---|###? )/m)[0];
      return {
        '@type': 'Question',
        name: question.trim(),
        acceptedAnswer: { '@type': 'Answer', text: plainText(answer) },
      };
    }),
}).replace(/</g, '\\u003c');

export default defineConfig({
  llms: true,
  outDir: 'out',
  lang: 'zh-CN',
  siteOrigin: SITE_ORIGIN,
  // Clean URLs match the canonical links and sitemap; GitHub Pages serves
  // /docs/intro from docs/intro.html.
  route: { cleanUrls: true },
  root: path.join(__dirname, 'pages'),
  title: 'Pushy 极速热更新',
  description:
    'Pushy —— 为 React Native 打造的热更新服务。KB 级增量包、CDN 秒级分发、崩溃自动回滚，让每一次发布秒级抵达用户，无需等待应用商店审核。',
  head: [
    (route) => ['link', { rel: 'canonical', href: `${SITE_ORIGIN}${route.routePath}` }],
    (route) => ['meta', { property: 'og:url', content: `${SITE_ORIGIN}${route.routePath}` }],
    ['meta', { property: 'og:site_name', content: 'Pushy 极速热更新' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-p98rK0Dlkk' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'keywords', content: 'React Native 热更新,RN 热更新,react-native-update,CodePush 替代,Expo 热更新,鸿蒙热更新,增量更新,免审核' }],
    (route) =>
      route.routePath === '/'
        ? `<script type="application/ld+json">${SOFTWARE_JSON_LD}</script>`
        : undefined,
    (route) =>
      route.routePath === '/docs/faq'
        ? `<script type="application/ld+json">${FAQ_JSON_LD}</script>`
        : undefined,
  ],
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
            { text: '原生主动检测与更新', link: '/docs/native-api' },
            { text: 'API Key', link: '/docs/api-token' },
            { text: 'MCP 服务', link: '/docs/mcp' },
            { text: '命令行工具', link: '/docs/cli' },
            { text: '数据分析', link: '/docs/analytics' },
            { text: 'JS 报错监控', link: '/docs/errors' },
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
      ],
    },
  },
  plugins: [rspressPluginMermaid()],
});
