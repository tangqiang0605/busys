import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker } from "@ant-design/pro-components";
import { FacilityAssignments, createFacilityAssignmentApi, deleteFacilityAssignmentApi, getAllFacilityAssignmentsApi, updateFacilityAssignmentApi } from '../../../apis/facility/facilityAssignments';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<FacilityAssignments>({
  entityName: '设施发放记录',
  idField: 'assignment_id',
  updateApi: updateFacilityAssignmentApi,
  deleteApi: deleteFacilityAssignmentApi,
  FormComponent: FacilityAssignmentsForm,
});

// 表格列配置
const tableColumns: ProColumnType<FacilityAssignments>[] = [
  {
    title: "发放记录ID",
    dataIndex: "assignment_id",
    key: "assignment_id",
    search: true,
    render: (text, record) => record.assignment_id,
    valueType: "text",
  },
  {
    title: "申请单ID",
    dataIndex: "request_id",
    key: "request_id",
    search: true,
    render: (text, record) => record.request_id,
    valueType: "text",
  },
  {
    title: "设施ID",
    dataIndex: "facility_id",
    key: "facility_id",
    search: true,
    render: (text, record) => record.facility_id,
    valueType: "text",
  },
  {
    title: "发放日期",
    dataIndex: "assignment_date",
    key: "assignment_date",
    search: true,
    render: (text, record) => new Date(record.assignment_date).toLocaleDateString(),
    valueType: "date",
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
  headerTitle: "设施发放记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<FacilityAssignments> = {
  request_id: 1,
  facility_id: 1,
  assignment_date: new Date().toISOString().split("T")[0], // 当前日期
};

// 表单组件
function FacilityAssignmentsForm() {
  return (
    <ProForm.Group title="设施发放记录信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="assignment_id"
        label="发放记录ID"
        disabled
        placeholder="请输入发放记录ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="request_id"
        label="申请单ID"
        placeholder="请输入申请单ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="facility_id"
        label="设施ID"
        placeholder="请输入设施ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="assignment_date"
        label="发放日期"
        placeholder="请选择发放日期"
        picker="date"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<FacilityAssignments> = {
  // CreateFormItem: <FacilityAssignmentsForm />,
  defaultForm,
  tableSettings,
  // createItemApi: createFacilityAssignmentApi,
  getAllItemApi: getAllFacilityAssignmentsApi,
  keyName: 'assignment_id'
};

/**
 * 设施发放记录信息管理
 * @returns 
 */
export default function FacilityAssignmentsInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}