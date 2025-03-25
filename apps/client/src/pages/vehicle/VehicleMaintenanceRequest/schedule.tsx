import { ProForm, ProFormDateTimePicker, ProFormTextArea, ProFormSelect, ProFormText, ProColumnType } from "@ant-design/pro-components";
import { MaintenanceRequest, RequestType, MaintenanceType, ApprovalStatus, createMaintenanceRequestApi, getAllMaintenanceRequestsApi, MaintenanceTypeMapper, deleteMaintenanceRequestApi, updateMaintenanceRequestApi } from "../../../apis/station/maintenanceRequest";
import { CommonTalbeProps } from "../../../components/types";
import { dateTime2iso } from "../../../utils/time";
import createInfoActionComponent from "../../../components/CommonAction";

const InfoAction = createInfoActionComponent<MaintenanceRequest>({
  entityName: '维护申请',
  idField: 'request_id',
  updateApi: updateMaintenanceRequestApi,
  deleteApi: deleteMaintenanceRequestApi,
  FormComponent: MaintenanceRequestScheduleForm,
});

// 表格列配置
const tableColumns: ProColumnType<MaintenanceRequest>[] = [
  {
    title: "申请ID",
    dataIndex: "request_id",
    key: "request_id",
    search: true,
    render: (text, record) => record.request_id,
    valueType: "text",
  },
  {
    title: "申请日期",
    dataIndex: "request_date",
    key: "request_date",
    search: true,
    render: (text, record) => new Date(record.request_date).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "申请描述",
    dataIndex: "request_description",
    key: "request_description",
    search: false,
    render: (text, record) => record.request_description,
    valueType: "text",
  },
  {
    title: "申请类型",
    dataIndex: "request_type",
    key: "request_type",
    search: true,
    render: (text, record) => record.request_type,
    valueType: "select",
    valueEnum: RequestType,
  },
  {
    title: "维护类型",
    dataIndex: "maintenance_type",
    key: "maintenance_type",
    search: true,
    render: (text, record) => MaintenanceTypeMapper[record.maintenance_type],
    valueType: "select",
    valueEnum: MaintenanceType,
  },
  {
    title: "维护目标ID",
    dataIndex: "maintenance_id",
    key: "maintenance_id",
    search: true,
    render: (text, record) => record.maintenance_id,
    valueType: "text",
  },
  {
    title: "审批状态",
    dataIndex: "approval_status",
    key: "approval_status",
    search: true,
    render: (text, record) => record.approval_status,
    valueType: "select",
    valueEnum: ApprovalStatus,
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

const defaultScheduleForm: Partial<MaintenanceRequest> = {
  request_description: '',
  request_type: RequestType.timer, // 默认为定期维护
  maintenance_type: MaintenanceType.vehicle, // 默认为设施
  maintenance_id: '',
  approval_status: ApprovalStatus.allowed, // 默认为审批中
};

// 表单组件
function MaintenanceRequestScheduleForm() {
  return (
    <ProForm.Group title="维护申请信息" layout="horizontal">
      <ProFormDateTimePicker
        rules={[{ required: true }]}
        width="md"
        name="request_date"
        label="申请日期"
        placeholder="请选择申请日期"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="request_description"
        label="申请描述"
        placeholder="请输入申请描述"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="request_type"
        label="申请类型"
        placeholder="请选择申请类型"
        valueEnum={{ [RequestType.timer]: "定期维护" }}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="maintenance_type"
        label="维护类型"
        placeholder="请选择维护类型"
        disabled
        valueEnum={{ [MaintenanceType.vehicle]: '车辆' }}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="maintenance_id"
        label="维护目标ID"
        placeholder="请输入维护目标ID"
      />
      {/* <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="approval_status"
        label="审批状态"
        placeholder="请选择审批状态"
        valueEnum={ApprovalStatus}
      /> */}
    </ProForm.Group>
  );
}

export const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "维护申请信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

export const scheduleProps: CommonTalbeProps<MaintenanceRequest> = {
  CreateFormItem: <MaintenanceRequestScheduleForm />,
  defaultForm: defaultScheduleForm,
  tableSettings: {},
  createItemApi: createMaintenanceRequestApi,
  getAllItemApi: getAllMaintenanceRequestsApi,
  keyName: 'request_id',
  createItemValue: (value: MaintenanceRequest) => {
    return {
      ...value,
      request_date: dateTime2iso(value.request_date)
    }
  }
};