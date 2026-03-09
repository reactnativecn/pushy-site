import { Layout as BasicLayout } from '@rspress/core/theme-original';
import GlobalServiceNotice from '../components/GlobalServiceNotice';
import '../styles/index.scss';
import '../components/home/home.scss';

export const Layout = () => (
  <>
    <GlobalServiceNotice />
    <BasicLayout />
  </>
);
export * from '@rspress/core/theme-original';
