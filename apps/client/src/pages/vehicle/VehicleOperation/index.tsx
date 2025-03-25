import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm } from "@ant-design/pro-components";
import { VehicleOperation, createVehicleOperationApi, deleteVehicleOperationApi, getAllVehicleOperationApi, updateVehicleOperationApi } from '../../../apis/vehicle/vehicleOperation';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<VehicleOperation>({
  entityName: '车辆运行记录',
  idField: 'operation_id',
  updateApi: updateVehicleOperationApi,
  deleteApi: deleteVehicleOperationApi,
  FormComponent: VehicleOperationForm,
});

// 表格列配置
const tableColumns: ProColumnType<VehicleOperation>[] = [
  {
    title: "运行记录ID",
    dataIndex: "operation_id",
    key: "operation_id",
    search: true,
    render: (text, record) => record.operation_id,
    valueType: "text",
  },
  {
    title: "车辆ID",
    dataIndex: "vehicle_id",
    key: "vehicle_id",
    search: true,
    render: (text, record) => record.vehicle_id,
    valueType: "text",
  },
  {
    title: "路线ID",
    dataIndex: "route_id",
    key: "route_id",
    search: true,
    render: (text, record) => record.route_id,
    valueType: "text",
  },
  {
    title: "司机ID",
    dataIndex: "driver_id",
    key: "driver_id",
    search: true,
    render: (text, record) => record.driver_id,
    valueType: "text",
  },
  {
    title: "创建时间",
    dataIndex: "created_at",
    key: "created_at",
    search: false,
    render: (text, record) => new Date(record.created_at).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "更新时间",
    dataIndex: "updated_at",
    key: "updated_at",
    search: false,
    render: (text, record) => new Date(record.updated_at).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    search: false,
    width: 100,
    render: (_, record) => {
      return <InfoAction record={record} />;
    },
  },
];

// 表格设置
const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "车辆运行记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<VehicleOperation> = {
  vehicle_id: 1,
  route_id: 1,
  driver_id: 1,
};

// 表单组件
function VehicleOperationForm() {
  return (
    <ProForm.Group title="车辆运行记录信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="operation_id"
        label="运行记录ID"
        disabled
        placeholder="请输入运行记录ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"

        name="vehicle_id"
        label="车辆ID"
        placeholder="请输入车辆ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="route_id"
        label="路线ID"
        placeholder="请输入路线ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="driver_id"
        label="司机ID"
        placeholder="请输入司机ID"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<VehicleOperation> = {
  CreateFormItem: <VehicleOperationForm />,
  defaultForm,
  tableSettings,
  createItemApi: createVehicleOperationApi,
  getAllItemApi: getAllVehicleOperationApi,
  keyName: 'operation_id',
};

/**
 * 车辆运行记录信息管理
 * @returns 
 */
export default function VehicleOperationInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}