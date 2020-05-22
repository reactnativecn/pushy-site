import { Form, Button, Input, Popover, Progress, message, Checkbox } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { Link, history } from 'umi';
import styles from './style.less';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};
const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
}

const Register: FC<{}> = () => {
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!userAndregister) {
      return;
    }

    const account = form.getFieldValue('mail');

    if (userAndregister.status === 'ok') {
      message.success('注册成功！');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }, [userAndregister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );

  // const onGetCaptcha = () => {
  //   let counts = 59;
  //   setcount(counts);
  //   interval = window.setInterval(() => {
  //     counts -= 1;
  //     setcount(counts);

  //     if (counts === 0) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);
  // };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('pwd');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  const onFinish = (values: { [key: string]: any }) => {
    
    // todo
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('pwd')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setvisible(!!value);
      return promise.reject('请输入密码！');
    } // 有值的情况

    if (!visible) {
      setvisible(!!value);
    }

    setpopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('pwd');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        >
          <Input size="large" placeholder="用户名" />
        </FormItem>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱地址！',
            },
            {
              type: 'email',
              message: '邮箱地址格式错误！',
            },
          ]}
        >
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }

            return node;
          }}
          content={
            visible && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  请至少输入 6 个字符。请不要使用容易被猜到的密码。
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="pwd"
            className={
              form.getFieldValue('pwd') &&
              form.getFieldValue('pwd').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: '请确认密码！',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        {/* <InputGroup compact>
         <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
           <Option value="86">+86</Option>
           <Option value="87">+87</Option>
         </Select>
         <FormItem
           style={{ width: '80%' }}
           name="mobile"
           rules={[
             {
               required: true,
               message: formatMessage({ id: 'userandregister.phone-number.required' }),
             },
             {
               pattern: /^\d{11}$/,
               message: formatMessage({ id: 'userandregister.phone-number.wrong-format' }),
             },
           ]}
         >
           <Input
             size="large"
             placeholder={formatMessage({ id: 'userandregister.phone-number.placeholder' })}
           />
         </FormItem>
        </InputGroup>
        <Row gutter={8}>
         <Col span={16}>
           <FormItem
             name="captcha"
             rules={[
               {
                 required: true,
                 message: formatMessage({ id: 'userandregister.verification-code.required' }),
               },
             ]}
           >
             <Input
               size="large"
               placeholder={formatMessage({ id: 'userandregister.verification-code.placeholder' })}
             />
           </FormItem>
         </Col>
         <Col span={8}>
           <Button
             size="large"
             disabled={!!count}
             className={styles.getCaptcha}
             onClick={onGetCaptcha}
           >
             {count
               ? `${count} s`
               : formatMessage({ id: 'userandregister.register.get-verification-code' })}
           </Button>
         </Col>
        </Row> */}
        <FormItem
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('请阅读并同意用户协议'),
            },
          ]}
        >
          <Checkbox>
            我已阅读并同意
            <a target="_blank" href="/agreement/">
              《Pushy热更新用户协议与隐私条款》
            </a>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};

export default Register;
