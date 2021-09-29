import React from 'react';
import { Link } from 'gatsby';
import { MenuOutlined } from '@ant-design/icons';
import { Row, Col, Menu, Button, Popover } from 'antd';
import logo from '../../images/logo.svg';

interface HeaderProps {
  isMobile: boolean;
  location: {
    pathname: string;
  };
}
interface HeaderState {
  inputValue?: string;
  menuVisible: boolean;
  menuMode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  timer: number;

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  render() {
    const { menuMode, menuVisible } = this.state;
    const { location } = this.props;
    const path = location.pathname;

    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (/^blog/.test(path)) {
      activeMenuItem = 'blog';
    } else if (path.includes('/docs/faq.html')) {
      activeMenuItem = 'faq';
    } else if (/docs/.test(path)) {
      activeMenuItem = 'docs';
    } else if (/pricing/.test(path)) {
      activeMenuItem = 'pricing';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }

    const menu = [
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link to="/docs/getting-started.html">文档</Link>
        </Menu.Item>
        <Menu.Item key="pricing">
          <Link to="/pricing.html">价格</Link>
        </Menu.Item>
        <Menu.Item key="faq">
          <Link to="/docs/faq.html">常见问题</Link>
        </Menu.Item>
        {/* <Menu.Item key="blog">
          <Link to="/blog/">Blog</Link>
        </Menu.Item> */}
      </Menu>,
    ];

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <MenuOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div className="right-header">
                <Button shape="round" href="https://pushy-admin.reactnative.cn/#/user" target="_blank">
                  登录
                </Button>
                <Button
                  shape="round"
                  href="https://pushy-admin.reactnative.cn/#/register"
                  target="_blank"
                  type="primary"
                >
                  注册
                </Button>
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
