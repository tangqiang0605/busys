import { PageContainer } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { commonTableProps, tableSettings } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

/**
 * 车辆设施管理
 * @returns 
 */
export default function VehicleFacilityInfo() {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable)
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTableProps} tableSettings={{
          ...tableSettings, params: {
            timestamp: refreshTable,
            location: "vehicle"
          }
        }} />
      </PageContainer>
    </div>
  )
}
