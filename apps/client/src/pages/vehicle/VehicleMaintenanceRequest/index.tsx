import { PageContainer, ProCard } from "@ant-design/pro-components";
import CommonTable from "../../../components/CommonTable";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import { unScheduleProps } from "./constants";
import { scheduleProps, tableSettings } from "./schedule";

/**
 * 维护申请信息管理
 * @returns 
 */
export default function VehicleMaintenanceRequestInfo() {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable);
  return (
    <div>
      <PageContainer>
        <ProCard tabs={{
          items: [
            {
              label: "定期维护",
              key: 'timer',
              children: (<CommonTable {...scheduleProps} tableSettings={{ ...tableSettings, params: { timestamp: refreshTable, maintenance_type: "vehicle" } }
              } />)
            },
            {
              label: "不定期维护",
              key: 'special',
              // children: <div>aa</div>
              children: <CommonTable {...unScheduleProps} />
            }
          ]
        }} />
        {/**/}
      </PageContainer>
    </div>
  )
}