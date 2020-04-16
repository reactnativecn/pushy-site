import React from 'react';
import Media from 'react-media';

import Pricing from '../components/pricing';
import WrapperLayout, { LayoutProps } from '../components/layout';

const IndexPage: React.FC<LayoutProps> = (props) => {
  const isNode = typeof window === 'undefined';
  return (
    <WrapperLayout {...props}>
      <Media query="(max-width: 599px)">
        {(isMobile) => <Pricing {...props} isMobile={isMobile && !isNode} />}
      </Media>
    </WrapperLayout>
  );
};

export default IndexPage;
