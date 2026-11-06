import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import rspressPluginMermaid from 'rspress-plugin-mermaid';
import { PAID_PLANS } from './components/pricing/plans';

const SITE_ORIGIN = 'https://pushy.reactnative.cn';
const OG_IMAGE = `${SITE_ORIGIN}/images/og.jpg`;
const LOGO_PNG = `${SITE_ORIGIN}/images/logo-512.png`;

const SAME_AS_LINKS = [
  'https://github.com/reactnativecn/react-native-update',
  'https://github.com/reactnativecn/react-native-update-cli',
  'https://www.npmjs.com/package/react-native-update',
  'https://www.npmjs.com/package/react-native-update-cli',
  'https://reactnative.cn',
];

const PUBLISHER = {
  '@type': 'Organization',
  name: 'Pushy 极速热更新',
  url: `${SITE_ORIGIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_PNG,
    width: 512,
    height: 512,
  },
  sameAs: SAME_AS_LINKS,
};

const HOME_JSON_LD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pushy 极速热更新',
    alternateName: ['Pushy', 'react-native-update', 'React Native 中文网热更新'],
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'zh-CN',
    publisher: PUBLISHER,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pushy',
    alternateName: ['Pushy 极速热更新', 'react-native-update'],
    url: `${SITE_ORIGIN}/`,
    image: OG_IMAGE,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'iOS, Android, HarmonyOS',
    inLanguage: 'zh-CN',
    description:
      '为 React Native 打造的热更新服务：KB 级增量包、CDN 秒级分发、崩溃自动回滚，无需等待应用商店审核。',
    publisher: PUBLISHER,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CNY',
      lowPrice: '0',
      highPrice: String(Math.max(...Object.values(PAID_PLANS).map((plan) => plan.annualPrice))),
      offerCount: String(Object.keys(PAID_PLANS).length + 1),
      url: `${SITE_ORIGIN}/pricing`,
    },
    sameAs: SAME_AS_LINKS,
  },
]).replace(/</g, '\\u003c');

const PRICING_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Pushy 热更新价格方案',
  url: `${SITE_ORIGIN}/pricing`,
  description: 'Pushy React Native 热更新免费版与付费版套餐，均包含国内外高速 CDN 流量且无超额账单。',
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Pushy 免费版',
      price: '0',
      priceCurrency: 'CNY',
      url: `${SITE_ORIGIN}/pricing`,
    },
    ...Object.values(PAID_PLANS).map((plan) => ({
      '@type': 'Offer',
      name: `Pushy ${plan.name}`,
      price: String(plan.annualPrice),
      priceCurrency: 'CNY',
      url: `${SITE_ORIGIN}/pricing`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(plan.annualPrice),
        priceCurrency: 'CNY',
        unitCode: 'ANN',
      },
    })),
  ],
}).replace(/</g, '\\u003c');

/** Markdown answer → plain text for structured data. */
function plainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^:::.*$/gm, '')
    .replace(/^<[A-Z][^>]*\/?>.*$/gm, '')
    .replace(/^\|?\s*-+\s*(\|\s*-+\s*)*\|?$/gm, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*>|]/g, ' ')
    .replace(/^\s*(?:-|\d+\.)\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * FAQPage JSON-LD built from Q&A headings so search engines and AI answer
 * engines can quote answers directly:
 * - /docs/faq uses "### 问题" across the whole page;
 * - any other doc or SEO guide with a "## 常见问题" section uses "### / #### 问题" inside it.
 */
function pageFaqJsonLd(routePath: string, absolutePath?: string) {
  if (!absolutePath || !fs.existsSync(absolutePath)) return undefined;
  const source = fs.readFileSync(absolutePath, 'utf8');
  let entries: Array<{ name: string; answer: string }> = [];

  if (routePath === '/docs/faq') {
    entries = source
      .split(/^### /m)
      .slice(1)
      .map((section) => {
        const [question, ...rest] = section.split('\n');
        const answer = rest.join('\n').split(/^(?:---|## )/m)[0];
        return { name: question.trim(), answer: plainText(answer) };
      });
  } else {
    const afterFaq = source.split(/^## 常见问题[ \t]*\r?\n/m)[1];
    if (!afterFaq) return undefined;
    const faqBlock = afterFaq.split(/^(?:## |<Footer\b)/m)[0];
    entries = faqBlock
      .split(/^#{3,4} /m)
      .slice(1)
      .map((section) => {
        const [question, ...rest] = section.split('\n');
        const answer = rest.join('\n').split(/^---/m)[0];
        return { name: question.trim(), answer: plainText(answer) };
      });
  }

  const mainEntity = entries
    .filter(({ name, answer }) => name && answer)
    .map(({ name, answer }) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    }));
  if (mainEntity.length === 0) return undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }).replace(/</g, '\\u003c');
}

// dateModified comes from each page's last commit, like the sitemap's lastmod;
// a shallow clone would date every page the same, so it is left out there.
const SHALLOW_CLONE = (() => {
  try {
    return execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: __dirname, encoding: 'utf8' }).trim() !== 'false';
  } catch {
    return true;
  }
})();

function lastCommitDate(file: string) {
  if (SHALLOW_CLONE) return undefined;
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { cwd: __dirname, encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

/** TechArticle + BreadcrumbList JSON-LD for /docs/* and top-level SEO guides. */
function articleJsonLd(routePath: string, absolutePath?: string) {
  if (!absolutePath || !fs.existsSync(absolutePath)) return undefined;
  if (routePath === '/' || routePath === '/pricing' || routePath === '/404') return undefined;
  const source = fs.readFileSync(absolutePath, 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const field = (name: string) =>
    frontmatter
      .match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2');
  const title = field('title');
  if (!title) return undefined;
  const headline = field('seoTitle') ?? title;
  const url = `${SITE_ORIGIN}${routePath}`;
  const isDoc = routePath.startsWith('/docs/');
  const breadcrumbs = isDoc
    ? [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: '文档', item: `${SITE_ORIGIN}/docs/intro` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ]
    : [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: title, item: url },
      ];
  return JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline,
      description: field('description'),
      url,
      mainEntityOfPage: url,
      image: OG_IMAGE,
      inLanguage: 'zh-CN',
      dateModified: lastCommitDate(absolutePath),
      author: PUBLISHER,
      publisher: PUBLISHER,
      about: { '@type': 'SoftwareApplication', name: 'Pushy', url: `${SITE_ORIGIN}/` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    },
  ]).replace(/</g, '\\u003c');
}

/**
 * Rspress v2.1+ rehypeHeaderAnchor emits real HTML `id` attributes for headings
 * nested inside `<Steps>`, whereas remarkToc only inspects top-level children
 * when registering anchor IDs for dead-anchor checks. Collect only real
 * `<Steps>` heading slugs so `checkAnchors` stays active everywhere else.
 */
const STEPS_ANCHORS = (() => {
  const pagesDir = path.join(__dirname, 'pages');
  const byRoute = new Map<string, Set<string>>();
  const allStepsIds = new Set<string>();

  const walk = (dir: string): string[] => {
    const out: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...walk(fullPath));
      else if (/\.(?:md|mdx)$/.test(entry.name)) out.push(fullPath);
    }
    return out;
  };

  for (const filePath of walk(pagesDir)) {
    const source = fs.readFileSync(filePath, 'utf8').replace(/```[\s\S]*?```/g, '');
    if (!source.includes('<Steps>')) continue;
    const rel = path
      .relative(pagesDir, filePath)
      .replace(/\\/g, '/')
      .replace(/\.(?:md|mdx)$/, '')
      .replace(/\/index$/, '');
    const routePath = `/${rel}`;
    const seen = new Map<string, number>();
    const stepsIds = new Set<string>();
    let stepsDepth = 0;

    for (const line of source.split(/\r?\n/)) {
      if (/^\s*<Steps>\s*$/.test(line)) {
        stepsDepth += 1;
        continue;
      }
      if (/^\s*<\/Steps>\s*$/.test(line)) {
        stepsDepth = Math.max(0, stepsDepth - 1);
        continue;
      }
      const heading = line.match(/^#{1,6}\s+(.+)$/);
      if (!heading) continue;
      const text = heading[1]
        .replace(/`([^`]*)`/g, '$1')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/\*\*([^*]*)\*\*/g, '$1')
        .replace(/\*([^*]*)\*/g, '$1')
        .trim();
      const base = text
        .toLowerCase()
        .replace(/[^\p{L}\p{M}\p{N}_\- ]/gu, '')
        .replace(/ /g, '-');
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;
      if (stepsDepth > 0 && id) {
        stepsIds.add(id);
        allStepsIds.add(id);
      }
    }

    if (stepsIds.size > 0) {
      byRoute.set(routePath, stepsIds);
    }
  }

  return {
    isValidStepsAnchor(nodeUrl: string): boolean {
      const hashIdx = nodeUrl.indexOf('#');
      if (hashIdx === -1) return false;
      const rawPath = nodeUrl.slice(0, hashIdx);
      const rawHash = nodeUrl.slice(hashIdx + 1);
      if (!rawHash) return false;
      let hash = rawHash;
      try {
        hash = decodeURIComponent(rawHash);
      } catch {}
      if (!rawPath) return allStepsIds.has(hash);
      const cleanPath = rawPath
        .replace(/\.(?:html|mdx|md)$/, '')
        .replace(/\/+$/, '');
      if (cleanPath.startsWith('/')) {
        return Boolean(byRoute.get(cleanPath)?.has(hash));
      }
      const suffix = `/${cleanPath.replace(/^\.\//, '')}`;
      for (const [routePath, ids] of byRoute) {
        if ((routePath === suffix || routePath.endsWith(suffix)) && ids.has(hash)) {
          return true;
        }
      }
      return false;
    },
  };
})();

export default defineConfig({
  llms: true,
  outDir: 'out',
  lang: 'zh-CN',
  siteOrigin: SITE_ORIGIN,
  markdown: {
    link: {
      checkAnchors: {
        excludes: (url) => STEPS_ANCHORS.isValidStepsAnchor(url),
      },
    },
  },
  // Map Rspress built-in 'zh' strings onto 'zh-CN' so <html lang="zh-CN"> stays
  // standard BCP 47 while outline/pagination/search UI renders in Chinese.
  i18nSource: (value) => {
    for (const item of Object.values(value)) {
      const record = item as Record<string, string>;
      if (record.zh && !record['zh-CN']) {
        record['zh-CN'] = record.zh;
      }
    }
    return value;
  },
  // Clean URLs match the canonical links and sitemap; GitHub Pages serves
  // /docs/intro from docs/intro.html.
  route: { cleanUrls: true },
  root: path.join(__dirname, 'pages'),
  title: 'Pushy 极速热更新',
  description:
    'Pushy —— 为 React Native 打造的热更新服务。KB 级增量包、CDN 秒级分发、崩溃自动回滚，让每一次发布秒级抵达用户，无需等待应用商店审核。',
  head: [
    (route) => ['link', { rel: 'canonical', href: `${SITE_ORIGIN}${route.routePath}` }],
    (route) =>
      route.routePath !== '/404'
        ? [
            'meta',
            {
              name: 'robots',
              content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
            },
          ]
        : undefined,
    (route) => ['meta', { property: 'og:url', content: `${SITE_ORIGIN}${route.routePath}` }],
    ['meta', { property: 'og:site_name', content: 'Pushy 极速热更新' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-p98rK0Dlkk' }],
    ['meta', { name: 'bytedance-verification-code', content: 'kLRVeDPrCWsZBJFx44/x' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'keywords', content: 'React Native 热更新,RN 热更新,react-native-update,CodePush 替代,Expo 热更新,鸿蒙热更新,增量更新,免审核' }],
    (route) =>
      route.routePath === '/'
        ? `<script type="application/ld+json">${HOME_JSON_LD}</script>`
        : undefined,
    (route) =>
      route.routePath === '/pricing'
        ? `<script type="application/ld+json">${PRICING_JSON_LD}</script>`
        : undefined,
    (route) => {
      const json = articleJsonLd(route.routePath, route.absolutePath);
      return json ? `<script type="application/ld+json">${json}</script>` : undefined;
    },
    (route) => {
      const json = pageFaqJsonLd(route.routePath, route.absolutePath);
      return json ? `<script type="application/ld+json">${json}</script>` : undefined;
    },
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
    lastUpdated: true,
    llmsUI: {
      viewOptions: ['markdownLink', 'chatgpt', 'claude'],
      placement: 'outline',
    },
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      {
        text: '选型对比',
        link: '/codepush-alternative',
        activeMatch: '^/(codepush-alternative|react-native-ota-updates|.*-vs-pushy)$',
        items: [
          { text: 'CodePush 停服替代方案', link: '/codepush-alternative' },
          { text: 'React Native 热更新全面指南', link: '/react-native-ota-updates' },
          { text: 'Expo / EAS Update 价格对比', link: '/expo-pricing-vs-pushy' },
          { text: '自建 Expo Updates 服务对比', link: '/expo-updates-self-hosted-vs-pushy' },
          { text: 'hot-updater vs Pushy', link: '/hot-updater-vs-pushy' },
          { text: 'Revopush vs Pushy', link: '/revopush-vs-pushy' },
          { text: 'Stallion vs Pushy', link: '/stallion-vs-pushy' },
        ],
      },
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
          text: '场景指南',
          items: [
            { text: '从 CodePush 迁移', link: '/docs/migrate-from-codepush' },
            { text: 'Expo 项目', link: '/docs/expo' },
            { text: 'React Native 新架构', link: '/docs/new-architecture' },
            { text: '鸿蒙 HarmonyOS', link: '/docs/harmony' },
            { text: 'Android 多渠道与 AAB', link: '/docs/android-channels-and-aab' },
            { text: '原生 App 混编（Brownfield）', link: '/docs/brownfield' },
            { text: 'CI/CD 自动发布', link: '/docs/cicd' },
            { text: '热更新排障指南', link: '/docs/troubleshooting' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: '常见问题', link: '/docs/faq' },
            { text: '更新日志', link: '/docs/changelog' },
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
          tag: 'link',
          attrs: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/images/apple-touch-icon.png',
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
            "(function(){var h=location.hostname;if(h!=='localhost'&&h!=='127.0.0.1'&&h!=='::1'&&h!=='[::1]')return;if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})})}if('caches' in window){caches.keys().then(function(ks){caches.forEach(function(k){caches.delete(k)})})}})();",
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
