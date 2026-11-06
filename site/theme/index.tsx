import { useFrontmatter, useHead, usePage } from '@rspress/core/runtime';
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import GlobalServiceNotice from '../components/GlobalServiceNotice';
import '../styles/index.scss';
import '../components/home/home.scss';

// The default layout tags every page og:type=website; doc and SEO guide pages
// are articles, seoTitle lets a page carry a fuller <title> than its sidebar
// label, and the 404 page stays out of the index.
function PageMeta() {
  const { page } = usePage();
  const { frontmatter } = useFrontmatter();
  const meta: Array<Record<string, unknown>> = [];
  const seoTitle = typeof frontmatter.seoTitle === 'string' ? frontmatter.seoTitle : undefined;

  if (page.routePath.startsWith('/docs/') || frontmatter.pageType === 'doc-wide') {
    meta.push({ property: 'og:type', content: 'article', tagPriority: 'high' as const });
  }
  if (seoTitle) {
    meta.push({ property: 'og:title', content: seoTitle, tagPriority: 'high' as const });
    meta.push({ name: 'twitter:title', content: seoTitle, tagPriority: 'high' as const });
  }
  if (page.pageType === '404') {
    meta.push({ name: 'robots', content: 'noindex' });
  }
  useHead({
    ...(seoTitle ? { title: seoTitle } : {}),
    meta,
  });
  return null;
}

export const Layout = () => (
  <>
    <PageMeta />
    <GlobalServiceNotice />
    <BasicLayout />
  </>
);
export * from '@rspress/core/theme-original';
