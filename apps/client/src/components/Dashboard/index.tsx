import type { ProSettings } from '@ant-design/pro-components';
import {
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import { accessTokenKey } from '../../apis/login';
import { filterRoutes, generateMenuData } from '../../utils/factory';
import { menuAndRouteData } from '../../routes/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Dashboard() {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const navigate = useNavigate()
  const [accessToken] = useLocalStorageState<{ data: string }>(accessTokenKey)

  const allowedRoutes = useSelector((state: RootState) => state.user.userInfo?.role.allowed_routes ?? [])

  return (<div id="Dashboard" style={{ height: '100vh' }}>
    {
      accessToken ? <>
        <ProLayout
          route={{
            path: '/',
            routes: filterRoutes(generateMenuData(menuAndRouteData), allowedRoutes),
          }}
          title='智能公交调度系统'
          logo='/logo.png'
          menuItemRender={(item, dom) => (
            <Link to={item.path as string}>
              {dom}
            </Link>
          )}
          waterMarkProps={{ content: '智慧城市智能公交调度系统' }}
          {...settings}
        >
          <Outlet />
        </ProLayout>
        <SettingDrawer
          settings={settings}
          onSettingChange={setSetting}
        />
      </> :
        <Result
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