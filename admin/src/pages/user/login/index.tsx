// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { Link, useModel, history, History } from 'umi';
import logo from '@/assets/logo.svg';
import { LoginParamsType, doLogin } from '@/services/login';
import LoginFrom from './components/Login';
import styles from './style.less';
import md5 from 'md5';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
const { UserName, Password, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {

  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/dashboard');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [loginMessage, setLoginMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async ({ pwd, ...values }: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const resp = await doLogin({ pwd: md5(pwd), ...values });
      if (resp.ok && initialState) {
        message.success('登录成功！');
        const currentUser = await initialState?.fetchUserInfo();
        setInitialState({
          ...initialState,
          currentUser,
        });
        replaceGoto();
        return;
      }
    } catch (error) {
      setLoginMessage(error.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              {/* <span className={styles.title}>Pushy热更新后台</span> */}
            </Link>
          </div>
          <div className={styles.desc}>极速热更新框架 for React Native</div>
        </div>

        <div className={styles.main}>
          <LoginFrom onSubmit={handleSubmit}>
            {/* <Tab key="account" tab="账户密码登录"> */}
            {loginMessage && <LoginMessage content={loginMessage} />}

            <UserName
              name="email"
              placeholder="注册邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入注册邮箱!',
                },
              ]}
            />
            <Password
              name="pwd"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            {/* </Tab> */}
            {/* <Tab key="mobile" tab="手机号登录">
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <LoginMessage content="验证码错误" />
              )}
              <Mobile
                name="mobile"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder="验证码"
                countDown={120}
                getCaptchaButtonText=""
                getCaptchaSecondText="秒"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              />
            </Tab> */}
            <div>
              <Link className={styles.register} to="/user/register">
                注册账户
              </Link>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
            <Submit loading={submitting}>登录</Submit>
            {/* <div className={styles.other}>
              其他登录方式
              <AlipayCircleOutlined className={styles.icon} />
              <TaobaoCircleOutlined className={styles.icon} />
              <WeiboCircleOutlined className={styles.icon} />
              <Link className={styles.register} to="/user/register">
                注册账户
              </Link>
            </div> */}
          </LoginFrom>
        </div>
      </div>
    </div>
  );
};

export default Login;
