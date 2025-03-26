import { PageContainer, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormDatePicker, ProFormTextArea, ProFormSelect } from "@ant-design/pro-components";
import { FacilityRequests, createFacilityRequestApi, getAllFacilityRequestsApi, OwnerType, ApprovalStatus } from '../../../apis/facility/facilityRequests';
import { CommonTalbeProps } from "../../../components/types";
import { ymd2iso } from '../../../utils/time';
import { RequestsAction } from './requestsAction';

// const InfoAction = createInfoActionComponent<FacilityRequests>({
//   entityName: '设施申请记录',
//   idField: 'request_id',
//   updateApi: updateFacilityRequestApi,
//   deleteApi: deleteFacilityRequestApi,
//   FormComponent: FacilityRequestsForm,
// });

// 表格列配置
const tableColumns: ProColumnType<FacilityRequests>[] = [
  {
    title: "申请单ID",
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
    render: (text, record) => new Date(record.request_date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "设施类型ID",
    dataIndex: "facility_type_id",
    key: "facility_type_id",
    search: true,
    render: (text, record) => record.facility_type_id,
    valueType: "text",
  },
  {
    title: "申请理由",
    dataIndex: "request_reason",
    key: "request_reason",
    search: false,
    render: (text, record) => record.request_reason,
    valueType: "text",
  },
  {
    title: "设施归属类型",
    dataIndex: "owner_type",
    key: "owner_type",
    search: true,
    render: (text, record) => record.owner_type,
    valueType: "select",
    valueEnum: OwnerType,
  },
  {
    title: "设施归属ID",
    dataIndex: "owner_id",
    key: "owner_id",
    search: true,
    render: (text, record) => record.owner_id,
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
      return <RequestsAction record={record} />;
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
  headerTitle: "设施申请记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<FacilityRequests> = {
  facility_type_id: 1,
  request_reason: '',
  owner_type: OwnerType.Station, // 默认设施归属类型为车站
  owner_id: '',
  approval_status: ApprovalStatus.approval, // 默认审批状态为审批中
};

// 表单组件
export function FacilityRequestsForm() {
  return (
    <ProForm.Group title="设施申请记录信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="request_id"
        label="申请单ID"
        disabled
        placeholder="请输入申请单ID"
      /> */}
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="request_date"
        label="申请日期"
        placeholder="请选择申请日期"
        picker="date"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="facility_type_id"
        label="设施类型ID"
        placeholder="请输入设施类型ID"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="request_reason"
        label="申请理由"
        placeholder="请输入申请理由"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="owner_type"
        label="设施归属类型"
        placeholder="请选择设施归属类型"
        valueEnum={OwnerType}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="owner_id"
        label="设施归属ID"
        placeholder="请输入设施归属ID"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="approval_status"
        label="审批状态"
        placeholder="请选择审批状态"
        disabled
        valueEnum={ApprovalStatus}
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<FacilityRequests> = {
  CreateFormItem: <FacilityRequestsForm />,
  defaultForm,
  tableSettings,
  createItemApi: createFacilityRequestApi,
  getAllItemApi: getAllFacilityRequestsApi,
  keyName: 'request_id',
  createItemValue: (values) => {
    return {
      ...values,
      request_date: ymd2iso(values.request_date)
    }
  }
};

/**
 * 设施申请记录信息管理
 * @returns 
 */
export default function FacilityRequestsInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}