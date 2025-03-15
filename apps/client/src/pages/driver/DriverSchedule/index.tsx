import {
  PageContainer
} from '@ant-design/pro-components';
import DriverTable from './DriverInfoTable';
import { useState } from 'react';

/**
 * 管理员看到的
 * @returns 
 */
export default function DriverSchedule() {
  const [tab, setTab] = useState('fixed')
  return (
    <div>
      <PageContainer
        content={'查看和管理司机排班信息'}
        tabList={[
          {
            tab: '固定工作时间表',
            key: 'fixed',
          },
          {
            tab: '不固定工作时间表',
            key: 'unfixed',
          },
        ]}
        onTabChange={(value: string) => {
          setTab(value)
        }}
      >
        {tab === 'fixed' ? <DriverTable /> : "unfixed"}
      </PageContainer>
    </div>
  )
}