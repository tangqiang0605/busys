import {
  PageContainer,
  ProCard
} from '@ant-design/pro-components';
import InfoTable from './InfoTable';
import ExtraInfoTable from './extra/InfoTable'

/**
 * 司机排班管理
 * @returns 
 */
export default function DriverSchedule() {
  // TODO 初始tab由url确定
  // TODO tab切换同步到url上
  return (
    <div>
      <PageContainer>
        <ProCard tabs={{
          items: [
            {
              label: '固定工作时间表',
              key: 'fixed',
              children: <InfoTable />
            }, {
              label: '不固定工作时间表',
              key: 'unfixed',
              children: (<ExtraInfoTable />)
            }]
        }} />
      </PageContainer>
    </div>
  )
}