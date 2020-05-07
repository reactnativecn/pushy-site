import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { SmileOutlined, CarOutlined, RocketOutlined } from '@ant-design/icons';
import './pricing.css';

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
                <li className="pricing__feature">5个原生包，每个不大于50M</li>
                <li className="pricing__feature">5个热更包，每个不大于5M</li>
                <li className="pricing__feature">每日下载更新不超过1万次</li>
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
                  <span className="pricing__currency">￥</span>399
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">可创建10个应用，每个应用限*：</li>
                <li className="pricing__feature">10个原生包，每个不大于100M</li>
                <li className="pricing__feature">10个热更包，每个不大于10M</li>
                <li className="pricing__feature">每日下载更新不超过10万次</li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button shape="round" type="primary">
                立即升级
              </Button>
            </div>
            <div className="pricing__item">
              <RocketOutlined className="icon" />
              <h3 className="pricing__title">专业版</h3>
              <p className="pricing__sentence">适用于商业应用，高速迭代需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>1999
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">可创建30个应用，每个应用限*：</li>
                <li className="pricing__feature">30个原生包，每个不大于300M</li>
                <li className="pricing__feature">30个热更包，每个不大于30M</li>
                <li className="pricing__feature">每日下载更新不超过100万次</li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button shape="round" type="primary">
                立即升级
              </Button>
            </div>
          </div>
          <div style={{ color: '#8b909d', textAlign: 'center' }}>
            <p>
              *注：iOS和Android版本记做不同的应用。原生包指完整的apk/ipa安装包。热更包指pushy bundle命令生成的ppk文件（不是用户实际下载的增量更新文件）。您可删除已不再使用的应用、原生包、热更包来有效利用配额。
            </p>
            <p>
              我们也提供私有服务器部署和功能定制，您可将具体需求发送至{' '}
              <a href="mailto:hi@charmlot.com">hi@charmlot.com</a>
            </p>
            <p>
              对于付费业务有疑问？请参考
              <a href="docs/faq#%E4%BB%98%E8%B4%B9%E9%97%AE%E9%A2%98">常见问题</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Pricing;
