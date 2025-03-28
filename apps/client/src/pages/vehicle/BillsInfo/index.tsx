import { PageContainer, ProCard } from "@ant-design/pro-components";
import CommonTable from "../../../components/CommonTable";
import { fareBillsTalbeProps } from "./fare";
import { commonTalbeProps, tableSettings } from "./fix";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";


/**
 * 账单信息管理
 * @returns 
 */
export default function VehicleBillsInfo() {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable)
  return (
    <div>
      <PageContainer>
        <ProCard tabs={{
          items: [
            {
              label: "车费",
              key: 'fare',
              children: <CommonTable {...fareBillsTalbeProps} />
            },
            {
              label: "维修费",
              key: 'fix',
              children: <CommonTable {...commonTalbeProps} tableSettings={{
                ...tableSettings, params: {
                  timeStamp: refreshTable,
                  bill_type: "维修费"
                }
              }} />
            }
          ]
        }} />
      </PageContainer>
    </div>
  )
}