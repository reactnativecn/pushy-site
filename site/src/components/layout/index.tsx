import React from 'react';
import Media from 'react-media';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {
  location: {
    pathname: string;
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

export function Layout(props: LayoutProps) {
  const { children, location, ...restProps } = props;
  const { pathname } = location;
  return (
    <div className={`page-wrapper ${pathname === '/' && 'index-page-wrapper'}`}>
      <Header {...restProps} location={location} />
      {React.cloneElement(children, {
        ...children.props,
        isMobile: restProps.isMobile,
      })}
      <Footer />
    </div>
  );
}

const WrapperLayout = (props: LayoutProps) => (
  <Media query="(max-width: 996px)">
    {(isMobile) => {
      const isNode = typeof window === 'undefined';
      return <Layout {...props} isMobile={isMobile && !isNode} />;
    }}
  </Media>
);
export default WrapperLayout;
