import React from 'react';
import { Row, Col } from 'antd';

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-wrap">
        <Row>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>联系我们</h2>
              <div>
                <a href="mailto:hi@charmlot.com">邮箱 hi@charmlot.com</a>
              </div>
              <div>
                <span style={{ color: 'rgba(255,255,255,.9)' }}>QQ群 729013783</span>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>用户协议</h2>
              <div>
                <a target="_blank" href="/agreement/">
                  用户协议
                </a>
              </div>
              <div>
                <a target="_blank" href="/agreement/#privacy">
                  隐私政策
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>帮助</h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="/docs/faq.html">
                  常见问题
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/reactnativecn/react-native-pushy/issues"
                >
                  issue讨论区
                </a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>链接</h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://reactnative.cn/">
                  React Native中文网
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://zh-hans.reactjs.org/">
                  ReactJS
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <section className="bottom-bar">
        <p>React Native中文网 © 2020 武汉青罗网络科技有限公司</p>
        <p>
          <a href="http://beian.miit.gov.cn/">鄂ICP备20002031号-3</a>
          <img
            src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
            alt="鄂公网安备 42011202001821号"
          />
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001821">
            鄂公网安备 42011202001821号
          </a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
