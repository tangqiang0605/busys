import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker } from "@ant-design/pro-components";
import { EmployeePositions, createEmployeePositionsApi, deleteEmployeePositionsApi, getAllEmployeePositionsApi, updateEmployeePositionsApi } from '../../../apis/employee/employeePositions';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<EmployeePositions>({
  entityName: '职工岗位',
  idField: 'position_id',
  updateApi: updateEmployeePositionsApi,
  deleteApi: deleteEmployeePositionsApi,
  FormComponent: EmployeePositionsForm,
});


// 表格列配置
const tableColumns: ProColumnType<EmployeePositions>[] = [
  {
    title: "岗位记录ID",
    dataIndex: "position_id",
    key: "position_id",
    search: true,
    render: (text, record) => record.position_id,
    valueType: "text",
  },
  {
    title: "职工ID",
    dataIndex: "employee_id",
    key: "employee_id",
    search: true,
    render: (text, record) => record.employee_id,
    valueType: "text",
  },
  {
    title: "岗位ID",
    dataIndex: "job_id",
    key: "job_id",
    search: true,
    render: (text, record) => record.job_id,
    valueType: "text",
  },
  {
    title: "进入岗位日期",
    dataIndex: "start_date",
    key: "start_date",
    search: false,
    render: (text, record) => new Date(record.start_date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "离开岗位日期",
    dataIndex: "end_date",
    key: "end_date",
    search: false,
    render: (text, record) => record.end_date ? new Date(record.end_date).toLocaleDateString() : "在职",
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
  headerTitle: "职工岗位信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<EmployeePositions> = {
  employee_id: 1,
  job_id: 1,
  start_date: new Date().toISOString().split("T")[0], // 当前日期
};

// 表单组件
function EmployeePositionsForm() {
  return (
    <ProForm.Group title="职工岗位信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="position_id"
        label="岗位记录ID"
        disabled
        placeholder="请输入岗位记录ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="employee_id"
        label="职工ID"
        placeholder="请输入职工ID"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="job_id"
        label="岗位ID"
        placeholder="请输入岗位ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="start_date"
        label="进入岗位日期"
        placeholder="请选择进入岗位日期"
        picker="date"
      />
      <ProFormDatePicker
        width="md"
        name="end_date"
        label="离开岗位日期"
        placeholder="请选择离开岗位日期（可选）"
        picker="date"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<EmployeePositions> = {
  CreateFormItem: <EmployeePositionsForm />,
  defaultForm,
  tableSettings,
  createItemApi: createEmployeePositionsApi,
  getAllItemApi: getAllEmployeePositionsApi,
  keyName: 'position_id'
}

/**
 * 职工任岗信息管理
 * @returns 
 */
export default function EmployeePositionsInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}
