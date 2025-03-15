import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { BusOne } from '@icon-park/react'
import {
  PageContainer,
  ProBreadcrumb,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import defaultProps from './_defaultProps';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

import { useLocalStorageState } from 'ahooks';
import { accessTokenKey, getUserInfoApi } from '../../apis/user';
import TokenInfo from './TokenInfo';



export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [accessToken, setAccessToken] = useLocalStorageState<string>(accessTokenKey)


  const navigate = useNavigate()
  useEffect(() => {
    if (!accessToken) {
      // TODO 自动跳转
      console.log(`qihangtang ${accessTokenKey}不存在`)
      // navigate('/login')
    }

    handleRoutes()

  }, [])

  const handleRoutes = async () => {
    const result = await getUserInfoApi()
    console.log('getUserInfo', result)
  }
  // let location = useLocation();
  return (<div
    id="Dashboard"
    style={{
      height: '100vh',
    }}
  >

    {
      accessToken ? <>

        {/* TODO 路由过滤 */}
        <ProLayout
          {...defaultProps}
          // headerContentRender={() => {
          //   return <ProBreadcrumb />;
          // }}
          // route={{}}
          headerContentRender={() => {
            return <ProBreadcrumb />;
          }}
          title='BUSYS'
          logo={<BusOne theme="outline" size="24" fill="#333" />}
          menuItemRender={(item, dom) => (
            <Link to={item.path as string}>
              {dom}
            </Link>
          )}
          waterMarkProps={{
            content: 'Busys',
          }}
          location={location}
          {...settings}
        >

          <TokenInfo />
          <Outlet />
        </ProLayout>
        <SettingDrawer
          // getContainer={() => document.getElementById('Dashboard')}
          settings={settings}
          onSettingChange={(changeSetting) => {
            setSetting(changeSetting);
          }}
        // disableUrlParams
        /></> : <Result
        title="请先登录"
        extra={
          <Button type="primary" key="console" onClick={() => navigate('/login')}>
            跳转到登录页
          </Button>
        }
      />
    }
  </div>
  );
};