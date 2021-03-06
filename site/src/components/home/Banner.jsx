import React from 'react';
import GitHubButton from 'react-github-button';
// import QueueAnim from 'rc-queue-anim';
// import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
// import BannerSVGAnim from './BannerSVGAnim';
import logo from '../../images/logo.svg';
import hero from '../../images/home_hero.svg';

function Banner(props) {
  const { isMobile } = props;
  return (
    <div className="banner-wrapper">
      {/* {isMobile && (
        <div className="banner-image-wrapper">
          <img height="100%" src={hero} alt="" />
        </div>
      )} */}
      <div className="banner-title-wrapper">
        {/* <h1 key="h1">Pushy</h1> */}
        <img src={logo} style={{ margin: '0 0 25px 20px' }} alt="Pushy" />
        <p>极速热更新框架 for React Native</p>
        <hr />
        <p style={{ marginTop: 30, fontSize: 16 }}>
          高速节点勤分发 &nbsp;&nbsp;&nbsp;山河浩广若比邻<br/>
          增量算法尽优化 &nbsp;&nbsp;&nbsp;字节四两拨千斤
        </p>
        <div className="button-wrapper">
          <Link to="/docs/getting-started.html">
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              立即免费体验
            </Button>
          </Link>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="reactnativecn"
            repo="react-native-pushy"
          />
        </div>
      </div>
      {!isMobile && (
        <div className="banner-image-wrapper">
          <img height="100%" src={hero} alt="" />
        </div>
      )}
    </div>
  );
}

export default Banner;
