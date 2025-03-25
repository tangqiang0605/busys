import { ProColumnType, ProForm, ProFormDigit, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { JobList } from "../../../apis/employee/jobList";
// import { JobList } from "../../../apis/jobList";

// 表格列配置
export const tableColumns: ProColumnType<JobList>[] = [
  {
    title: "岗位ID",
    dataIndex: "job_id",
    key: "job_id",
    search: true,
    render: (text, record) => record.job_id,
    valueType: "text",
  },
  {
    title: "岗位名称",
    dataIndex: "job_title",
    key: "job_title",
    search: true,
    render: (text, record) => record.job_title,
    valueType: "text",
  },
  {
    title: "岗位描述",
    dataIndex: "job_description",
    key: "job_description",
    search: false,
    render: (text, record) => record.job_description || "无描述",
    valueType: "text",
  },
  {
    title: "岗位薪资",
    dataIndex: "salary",
    key: "salary",
    search: true,
    render: (text, record) => record.salary,
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
export const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "岗位信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<JobList> = {
  job_title: "新岗位名称",
  salary: 0.0,
};

// 表单组件
export function JobListForm() {
  return (
    <ProForm.Group title="岗位信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="job_id"
        label="岗位ID"
        disabled
        placeholder="请输入岗位ID"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="job_title"
        label="岗位名称"
        placeholder="请输入岗位名称"
      />
      <ProFormTextArea
        width="md"
        name="job_description"
        label="岗位描述"
        placeholder="请输入岗位描述（可选）"
        fieldProps={{
          rows: 4,
        }}
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="salary"
        label="岗位薪资"
        placeholder="请输入岗位薪资"
      />
    </ProForm.Group>
  );
}