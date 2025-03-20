import {
  ProCard
} from '@ant-design/pro-components';
import InfoTable from './InfoTable';
// import { useState } from 'react';

/**
 * 管理员看到的
 * @returns 
 */
export default function DriverSchedule() {
  // const [tab, setTab] = useState('fixed')
  return (
    <div>
      {/* <PageContainer
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
      </PageContainer> */}
      <ProCard tabs={{
        items: [
          {
            label: '固定工作时间表',
            key: 'fixed',
            children: <InfoTable />
          }, {
            label: '不固定工作时间表',
            key: 'unfixed',
            children: (<div>aa</div>)
          }]
      }} />
    </div>
  )
}