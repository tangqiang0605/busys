import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormTextArea } from "@ant-design/pro-components";
import { StationMaintenance, createStationMaintenanceApi, deleteStationMaintenanceApi, getAllStationMaintenanceApi, updateStationMaintenanceApi } from '../../../apis/station/stationMaintenance';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<StationMaintenance>({
  entityName: '车站维护记录',
  idField: 'maintenance_id',
  updateApi: updateStationMaintenanceApi,
  deleteApi: deleteStationMaintenanceApi,
  FormComponent: StationMaintenanceForm,
});

// 表格列配置
const tableColumns: ProColumnType<StationMaintenance>[] = [
  {
    title: "维护记录ID",
    dataIndex: "maintenance_id",
    key: "maintenance_id",
    search: true,
    render: (text, record) => record.maintenance_id,
    valueType: "text",
  },
  {
    title: "车站ID",
    dataIndex: "station_id",
    key: "station_id",
    search: true,
    render: (text, record) => record.station_id,
    valueType: "text",
  },
  {
    title: "维护日期",
    dataIndex: "maintenance_date",
    key: "maintenance_date",
    search: true,
    render: (text, record) => new Date(record.maintenance_date).toLocaleDateString(),
    valueType: "date",
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
    title: "维护描述",
    dataIndex: "description",
    key: "description",
    search: false,
    render: (text, record) => record.description,
    valueType: "text",
  },
  {
    title: "账单ID",
    dataIndex: "bill_id",
    key: "bill_id",
    search: true,
    render: (text, record) => record.bill_id || '无',
    valueType: "text",
  },
  {
    title: "职员ID",
    dataIndex: "staff_id",
    key: "staff_id",
    search: true,
    render: (text, record) => record.staff_id,
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
  headerTitle: "车站维护记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<StationMaintenance> = {
  station_id: 1,
  request_id: 1,
  staff_id: 1,
  maintenance_date: new Date().toISOString().split("T")[0], // 当前日期
  description: '',
};

// 表单组件
function StationMaintenanceForm() {
  return (
    <ProForm.Group title="车站维护记录信息" layout="horizontal">
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="maintenance_id"
        label="维护记录ID"
        disabled
        placeholder="请输入维护记录ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="station_id"
        label="车站ID"
        placeholder="请输入车站ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="maintenance_date"
        label="维护日期"
        placeholder="请选择维护日期"
        picker="date"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="request_id"
        label="维护申请ID"
        placeholder="请输入维护申请ID"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="description"
        label="维护描述"
        placeholder="请输入维护描述"
      />
      <ProFormText
        width="md"
        name="bill_id"
        label="账单ID"
        placeholder="请输入账单ID（可选）"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="staff_id"
        label="职员ID"
        placeholder="请输入职员ID"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<StationMaintenance> = {
  CreateFormItem: <StationMaintenanceForm />,
  defaultForm,
  tableSettings,
  createItemApi: createStationMaintenanceApi,
  getAllItemApi: getAllStationMaintenanceApi,
  keyName: 'maintenance_id'
};

/**
 * 车站维护记录信息管理
 * @returns 
 */
export default function StationMaintenanceInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}