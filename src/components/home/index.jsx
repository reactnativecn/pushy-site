import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';

import './home.less';

function Home(props) {
  return (
    <>
      <Helmet>
        <title>Pushy - 极速热更新框架 for React Native</title>
        <meta name="description" content="Pushy - 极速热更新框架 for React Native" />
      </Helmet>
      <div className="home-wrapper">
        <Banner {...props} />
        <Page1 {...props} />
        <Page2 {...props} />
      </div>
    </>
  );
}

export default Home;
