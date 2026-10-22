import { useHead, usePage } from '@rspress/core/runtime';
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import GlobalServiceNotice from '../components/GlobalServiceNotice';
import '../styles/index.scss';
import '../components/home/home.scss';

// The default layout tags every page og:type=website; doc pages are articles,
// and the 404 page should stay out of the index. tagPriority 'high' lets these
// win over the default layout's tags of the same name.
function PageMeta() {
  const { page } = usePage();
  const meta = [];
  if (page.routePath.startsWith('/docs/')) {
    meta.push({ property: 'og:type', content: 'article', tagPriority: 'high' as const });
  }
  if (page.pageType === '404') {
    meta.push({ name: 'robots', content: 'noindex' });
  }
  useHead({ meta });
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
