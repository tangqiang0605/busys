import { PageContainer } from '@ant-design/pro-components';
import InfoTable from './InfoTable';
import { useState } from 'react';

/**
 * 管理员看到的
 * @returns 
 */
export default function RouteInfo() {
  const [tab, setTab] = useState('fixed')
  return (
    <div>
      <PageContainer
      // content={'查看和管理司机排班信息'}
      >
        <InfoTable />
      </PageContainer>
    </div>
  )
}
