import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { theme } from 'antd';
import { tryLoginApi } from '../apis/user';

interface LoginForm {
  "username": string,
  "password": string
}

const Page = () => {
  // const [loginType, setLoginType] = useState<LoginType>('account');
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const tryLogin = async (values: LoginForm) => {
    // const result = await readRolesApi()
    const result = await tryLoginApi({ id: values.username, password: values.password })
    // console.log(result)
    if (typeof result === 'string') {
      // TODO 登录失败处理
      return;
    }

    navigate('/');
    // const result = await fetch('/api/user/read_role', { method: 'POST' })
    // console.log(await result.json())
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage<LoginForm>
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="/logo.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Busys"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="智慧城市智能公交调度系统"
        onFinish={tryLogin}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'用户名: admin or user'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'密码: ant.design'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          {/* TODO */}
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default function LoginPage() {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};