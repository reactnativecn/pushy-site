// import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';

function Page2() {
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>
          Let’s <span>Pushy</span>
        </h2>
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
            <div key="code1" className="home-code">
              <div># 安装</div>
              <div>$ npm i -g react-native-update-cli</div>
              <div>$ npm i react-native-update && cd ios && pod install</div>

              <br />
              <div># 上传原生基础包</div>
              <div>$ pushy uploadIpa yourApp.ipa</div>
              <div>$ pushy uploadApk yourApp.apk</div>

              <br />
              <div># 生成并上传热更包</div>
              <div>$ pushy bundle --platform android</div>
              <div>$ pushy bundle --platform ios</div>
            </div>
            <Button
              style={{ marginTop: 40, padding: '4px 56px' }}
              type="primary"
              href="/docs/getting-started.html"
            >
              查看文档
            </Button>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
