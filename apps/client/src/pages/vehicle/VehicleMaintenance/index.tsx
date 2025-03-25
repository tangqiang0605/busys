import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormTextArea } from "@ant-design/pro-components";
import { VehicleMaintenance, createVehicleMaintenanceApi, deleteVehicleMaintenanceApi, getAllVehicleMaintenanceApi, updateVehicleMaintenanceApi } from '../../../apis/vehicle/vehicleMaintenance';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<VehicleMaintenance>({
  entityName: '车辆维护记录',
  idField: 'maintenance_id',
  updateApi: updateVehicleMaintenanceApi,
  deleteApi: deleteVehicleMaintenanceApi,
  FormComponent: VehicleMaintenanceForm,
});

// 表格列配置
const tableColumns: ProColumnType<VehicleMaintenance>[] = [
  {
    title: "维护记录ID",
    dataIndex: "maintenance_id",
    key: "maintenance_id",
    search: true,
    render: (text, record) => record.maintenance_id,
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
    title: "维护申请ID",
    dataIndex: "request_id",
    key: "request_id",
    search: true,
    render: (text, record) => record.request_id,
    valueType: "text",
  },
  {
    title: "技术员ID",
    dataIndex: "staff_id",
    key: "staff_id",
    search: true,
    render: (text, record) => record.staff_id,
    valueType: "text",
  },
  {
    title: "维护描述",
    dataIndex: "description",
    key: "description",
    search: false,
    render: (text, record) => record.description,
    valueType: "text",
  },
  {
    title: "维护开始日期",
    dataIndex: "start_date",
    key: "start_date",
    search: false,
    render: (text, record) => new Date(record.start_date).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "维护结束日期",
    dataIndex: "end_date",
    key: "end_date",
    search: false,
    render: (text, record) => new Date(record.end_date).toLocaleString(),
    valueType: "dateTime",
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "created_at",
  //   key: "created_at",
  //   search: false,
  //   render: (text, record) => new Date(record.created_at).toLocaleString(),
  //   valueType: "dateTime",
  // },
  // {
  //   title: "更新时间",
  //   dataIndex: "updated_at",
  //   key: "updated_at",
  //   search: false,
  //   render: (text, record) => new Date(record.updated_at).toLocaleString(),
  //   valueType: "dateTime",
  // },
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
  headerTitle: "车辆维护记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<VehicleMaintenance> = {
  vehicle_id: 1,
  request_id: 1,
  staff_id: 1,
  description: '',
  start_date: new Date().toISOString(), // 当前日期时间
  end_date: new Date().toISOString(), // 当前日期时间
};

// 表单组件
function VehicleMaintenanceForm() {
  return (
    <ProForm.Group title="车辆维护记录信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="maintenance_id"
        label="维护记录ID"
        disabled
        placeholder="请输入维护记录ID"
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
        name="request_id"
        label="维护申请ID"
        placeholder="请输入维护申请ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="staff_id"
        label="技术员ID"
        placeholder="请输入技术员ID"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="description"
        label="维护描述"
        placeholder="请输入维护描述"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="start_date"
        label="维护开始日期"
        placeholder="请选择维护开始日期"
        picker="datetime"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="end_date"
        label="维护结束日期"
        placeholder="请选择维护结束日期"
        picker="datetime"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<VehicleMaintenance> = {
  CreateFormItem: <VehicleMaintenanceForm />,
  defaultForm,
  tableSettings,
  createItemApi: createVehicleMaintenanceApi,
  getAllItemApi: getAllVehicleMaintenanceApi,
  keyName: 'maintenance_id',
  createItemValue: (values) => {
    return {
      ...values,
      request_id: Number(values.request_id)
    }
  }
};

/**
 * 车辆维护记录信息管理
 * @returns 
 */
export default function VehicleMaintenanceInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}