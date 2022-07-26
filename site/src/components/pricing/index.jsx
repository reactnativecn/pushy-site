import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Tooltip } from 'antd';
import { SmileOutlined, CarOutlined, RocketOutlined, SendOutlined } from '@ant-design/icons';
import './pricing.css';

function gotoPurchase() {
  window.location.href = 'https://update.reactnative.cn/profile';
}

const AppText = () => <Tooltip title="iOS 和 Android 版本记做不同的应用。您可删除已不再使用的应用来有效利用配额。">应用</Tooltip>;
const PackageText = () => <Tooltip title="原生包指完整的 apk 或 ipa 格式的安装包。您可删除已不再使用的原生包来有效利用配额。">原生包</Tooltip>;
const HotUpdateText = () => (
  <Tooltip
    title={`热更包指"pushy bundle"命令生成的 ppk 文件（其中包含jsbundle、图片等业务逻辑文件）。
注意这不是用户实际下载的文件，用户实际下载的是经过服务器运算后生成的极小差量补丁包。您可删除已不再使用的热更包来有效利用配额。`}
  >
    热更包
  </Tooltip>
);

function Pricing() {
  return (
    <>
      <Helmet>
        <title>价格 - Pushy - 极速热更新</title>
        <meta name="description" content="价格 - Pushy - 极速热更新" />
      </Helmet>
      <div className="home-wrapper">
        <section className="pricing-section">
          <p
            style={{
              marginBottom: 25,
              textAlign: 'center',
            }}
          >
            新注册用户将自动获得{' '}
            <Tooltip title="您可将注册用户名、公司（或个人）名称发送至<hi@charmlot.com>，申请延长评估时间">
              7 天
            </Tooltip>
            的<u>专业版</u>
            免费试用评估。到期后转为免费版。
          </p>
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
                <li className="pricing__feature">
                  可创建3个
                  <AppText />
                  ，每个限*：
                </li>
                <li className="pricing__feature">
                  30个
                  <PackageText />
                  ，每个最大30M
                </li>
                <li className="pricing__feature">
                  30个
                  <HotUpdateText />
                  ，每个最大3M
                </li>
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
                  <span className="pricing__currency">￥</span>698
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">
                  可创建5个
                  <AppText /> ，每个限*：
                </li>
                <li className="pricing__feature">
                  50个
                  <PackageText />
                  ，每个最大100M
                </li>
                <li className="pricing__feature">
                  50个 <HotUpdateText />
                  ，每个最大15M
                </li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button
                style={{ marginTop: 'auto' }}
                shape="round"
                type="primary"
                onClick={gotoPurchase}
              >
                立即升级
              </Button>
            </div>
            <div className="pricing__item">
              <SendOutlined className="icon" />
              <h3 className="pricing__title">高级版</h3>
              <p className="pricing__sentence">适用于一般应用，中度更新需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>1998
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">
                  可创建6个
                  <AppText />
                  ，每个限*：
                </li>
                <li className="pricing__feature">
                  60个
                  <PackageText />
                  ，每个最大300M
                </li>
                <li className="pricing__feature">
                  60个 <HotUpdateText />
                  ，每个最大50M
                </li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button
                style={{ marginTop: 'auto' }}
                shape="round"
                type="primary"
                onClick={gotoPurchase}
              >
                立即升级
              </Button>
            </div>
            <div className="pricing__item">
              <RocketOutlined className="icon" />
              <h3 className="pricing__title">专业版</h3>
              <p className="pricing__sentence">适用于商业应用，高速迭代需求</p>
              <div className="pricing__price">
                <span className="pricing__anim pricing__anim--1">
                  <span className="pricing__currency">￥</span>6998
                </span>
                <span className="pricing__anim pricing__anim--2">
                  <span className="pricing__period">/ 年</span>
                </span>
              </div>
              <ul className="pricing__feature-list">
                <li className="pricing__feature">
                  可创建10个
                  <AppText />
                  ，每个限*：
                </li>
                <li className="pricing__feature">
                  100个
                  <PackageText />
                  ，每个最大1000M
                </li>
                <li className="pricing__feature">
                  100个 <HotUpdateText />
                  ，每个最大200M
                </li>
                <li className="pricing__feature">提供专人技术支持</li>
              </ul>
              <Button
                style={{ marginTop: 'auto' }}
                shape="round"
                type="primary"
                onClick={gotoPurchase}
              >
                立即升级
              </Button>
            </div>
          </div>
          <div style={{ color: '#8b909d', textAlign: 'center', fontSize: '15px', marginTop: 10 }}>
            <p>
              如您需要更高配额，我们也提供定制版本或是私有服务器部署，您可将具体需求发送至{' '}
              <a href="mailto:hi@charmlot.com">hi@charmlot.com</a> 我们将第一时间回复。
            </p>
            <p>
              *注：iOS 和 Android 版本记做不同的应用。
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
