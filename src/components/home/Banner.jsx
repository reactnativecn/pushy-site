import React from 'react';
import GitHubButton from 'react-github-button';
// import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
// import BannerSVGAnim from './BannerSVGAnim';
import logo from '../../images/logo.svg';
import hero from '../../images/home_hero.svg';

function Banner(props) {
  const { isMobile, location } = props;
  return (
    <div className="banner-wrapper">
      {isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <div className="banner-title-wrapper">
        {/* <h1 key="h1">Pushy</h1> */}
        <img src={logo} style={{ margin: '0 0 25px 20px' }} alt="Pushy" />
        <p>极速热更新框架 for React Native</p>
        <div className="button-wrapper">
          <Link to="/docs/getting-started">
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
