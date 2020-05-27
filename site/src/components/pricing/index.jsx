import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { SmileOutlined, CarOutlined, RocketOutlined } from '@ant-design/icons';
import './pricing.css';

function gotoPurchase() {
  window.location.href = 'https://update.reactnative.cn/profile';
}

function Pricing() {
  return (
    <>
      <Helmet>
        <title>价格 - Pushy - 极速热更新框架 for React Native</title>
        <meta name="description" content="价格 - Pushy - 极速热更新框架 for React Native" />
      </Helmet>
      <div className="home-wrapper">
        <section className="pricing-section">
          <div className="pricing pricing--rabten">
            <div className="pricing__item">
              <SmileOutlined className="icon" />
              <h3 className="pricing__title">免费版</h3>
              <p className="pricing__sentence">适用于小型应用，轻度更新需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>0
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period"> / 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">可创建3个应用，每个应用限*：</li>
                <li className="pricing__feature">30个原生包，每个最大30M</li>
                <li className="pricing__feature">30个热更包，每个最大3M</li>
                <li className="pricing__feature">每日前3千次更新满速下载</li>
              </ul>
              <Button
                shape="round"
                style={{ marginTop: 'auto', padding: '4px 16px' }}
                href="docs/getting-started"
              >
                开始使用
              </Button>
            </div>
            <div className="pricing__item">
              <CarOutlined className="icon" />
              <h3 className="pricing__title">标准版</h3>
              <p className="pricing__sentence">适用于一般应用，中度更新需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>598
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">可创建5个应用，每个应用限*：</li>
                <li className="pricing__feature">50个原生包，每个最大100M</li>
                <li className="pricing__feature">50个热更包，每个最大15M</li>
                <li className="pricing__feature">每日前1万次更新满速下载</li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button shape="round" type="primary" onClick={gotoPurchase}>
                立即升级
              </Button>
            </div>
            <div className="pricing__item">
              <RocketOutlined className="icon" />
              <h3 className="pricing__title">专业版</h3>
              <p className="pricing__sentence">适用于商业应用，高速迭代需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>2998
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">可创建10个应用，每个应用限*：</li>
                <li className="pricing__feature">100个原生包，每个最大500M</li>
                <li className="pricing__feature">100个热更包，每个最大50M</li>
                <li className="pricing__feature">每日前10万次更新满速下载</li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button shape="round" type="primary" onClick={gotoPurchase}>
                立即升级
              </Button>
            </div>
          </div>
          <div style={{ color: '#8b909d', textAlign: 'center' }}>
            <p>当前价格表自2020年6月1日起开始执行</p>
            <p>
              如您需要更高配额，我们也提供定制版本或是私有服务器部署，您可将具体需求发送至{' '}
              <a href="mailto:hi@charmlot.com">hi@charmlot.com</a> 我们将第一时间回复。
            </p>
            <p>
              *注：iOS和Android版本记做不同的应用。
              <br />
              原生包指完整的apk/ipa安装包。热更包指pushy
              bundle命令生成的ppk文件（不是用户实际下载的增量更新文件）。
              <br />
              您可删除已不再使用的应用、原生包、热更包来有效利用配额。
            </p>
            <p>
              对于付费业务还有其他疑问？请参考
              <a href="docs/faq.html#%E4%BB%98%E8%B4%B9%E9%97%AE%E9%A2%98">常见问题</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Pricing;
