/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Parallax from 'rc-scroll-anim/lib/ScrollParallax';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

import deltaIcon from '../../images/smartphone-3.svg';
import publishIcon from '../../images/internet-1.svg';
import downloadIcon from '../../images/wifi.svg';
import strategyIcon from '../../images/strategy.svg';
import reliableIcon from '../../images/circuit.svg';
import supportIcon from '../../images/chat.svg';

const { TweenOneGroup } = TweenOne;
const featuresCN = [
  {
    title: '增量更新',
    content: ['基于 bsdiff/hdiff 算法创建', 'kb 级别超小更新包'],
    src: deltaIcon,
  },
  {
    title: '快捷发布',
    content: ['命令行工具 & 网页双端管理', '支持CI部署'],
    src: publishIcon,
  },
  {
    title: '极速下载',
    content: ['基于阿里云高速CDN分发', '全国范围秒速更新'],
    src: downloadIcon,
  },
  {
    title: '稳定可靠',
    content: ['自带崩溃回滚机制', '安全可靠'],
    src: reliableIcon,
  },
  {
    title: '灵活扩展',
    content: ['开放定制元信息', '提供灵活自由的更新策略'],
    src: strategyIcon,
  },
  {
    title: '技术支持',
    content: ['遇到技术问题？', '工作时间段内小时级别响应'],
    src: supportIcon,
  },
];

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
];

class Page1 extends React.Component {
  state = {
    hoverNum: null,
  };

  onMouseOver = (i) => {
    this.setState({
      hoverNum: i,
    });
  };

  onMouseOut = () => {
    this.setState({
      hoverNum: null,
    });
  };

  getEnter = (e) => {
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      {
        delay,
        opacity: 0.4,
        ...pointPos[e.index],
        ease: 'easeOutBack',
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };

  render() {
    const { hoverNum } = this.state;
    const { isMobile } = this.props;
    let children = [[], [], []];
    featuresCN.forEach((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        'point-0 left',
        'point-0 right',
        'point-ring',
        'point-1',
        'point-2',
        'point-3',
      ].map((className) => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        />
      ));
      const child = (
        <li key={i.toString()}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              this.onMouseOver(i);
            }}
            onMouseLeave={this.onMouseOut}
          >
            <TweenOneGroup
              className="page1-point-wrapper"
              enter={this.getEnter}
              leave={{
                x: 0,
                y: 30,
                opacity: 0,
                duration: 300,
                ease: 'easeInBack',
              }}
              resetStyle={false}
              exclusive
            >
              {(isMobile || isHover) && pointChild}
            </TweenOneGroup>
            <div
              className="page1-image"
              style={{
                boxShadow: `${isHover ? '0 12px 24px' : '0 6px 12px'} ${item.shadowColor}`,
              }}
            >
              <img src={item.src} alt="img" style={i === 4 ? { marginLeft: -15 } : {}} />
            </div>
            <h3>{item.title}</h3>
            {item.content.map((t, tkey) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={tkey}>{t}</p>
            ))}
          </div>
        </li>
      );
      children[Math.floor(i / 3)].push(child);
    });

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 100, (children.length - 1 - i) * 100]}
        component="ul"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          {!isMobile && (
            <Parallax
              className="page1-bg"
              animation={{
                translateY: 200,
                ease: 'linear',
                playScale: [0, 1.65],
              }}
              location="page1-wrapper"
            >
              Feature
            </Parallax>
          )}
          <h2>
            为什么选择 <span>Pushy</span> ？
          </h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          <OverPack>{children}</OverPack>
          <div style={{ float: 'right', opacity: 0.4, marginRight: '6%' }}>
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/swifticons" title="Swifticons">
              Swifticons
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Page1;
