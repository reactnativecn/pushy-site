// import React from 'react';
// import { Helmet } from 'react-helmet';

import Banner from "./Banner";
import Page1 from "./Page1";
import Page2 from "./Page2";

function Home(props) {
  return (
    <>
      {/* <Helmet>
        <title>Pushy - 极速热更新</title>
        <meta name="keywords" content="热更新,hotupdate,免审核" />
        <meta name="description" content="Pushy - 极速热更新" />
      </Helmet> */}
      <div className="home-wrapper">
        <Banner {...props} />
        <Page1 {...props} />
        <Page2 {...props} />
      </div>
    </>
  );
}

export default Home;
