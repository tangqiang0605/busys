import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { BusOne } from '@icon-park/react'
import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';
import { Link, Outlet } from 'react-router';

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  // const [pathname, setPathname] = useState('/');
  return (
    <div
      id="Dashboard"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
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
        // avatarProps={{
        //   icon: <UserOutlined />,
        // }}
        {...settings}
      >
        <Outlet />
      </ProLayout>
      <SettingDrawer
        // getContainer={() => document.getElementById('Dashboard')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
      // disableUrlParams
      />
    </div>
  );
};