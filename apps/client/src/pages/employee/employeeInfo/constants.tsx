import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { Employee } from "../../../apis/employee/employeeInfo";

// 表格列配置
export const tableColumns: ProColumnType<Employee>[] = [
  {
    title: "职工ID",
    dataIndex: "employee_id",
    key: "employee_id",
    search: true,
    render: (text, record) => record.employee_id,
    valueType: "text",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    search: true,
    render: (text, record) => record.name,
    valueType: "text",
  },
  {
    title: "出生日期",
    dataIndex: "birth_date",
    key: "birth_date",
    search: false,
    render: (text, record) => new Date(record.birth_date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    search: true,
    render: (text, record) => record.gender,
    valueType: "text",
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address",
    search: true,
    render: (text, record) => record.address,
    valueType: "text",
  },
  {
    title: "联系电话",
    dataIndex: "phone_number",
    key: "phone_number",
    search: true,
    render: (text, record) => record.phone_number,
    valueType: "text",
  },
  {
    title: "身份证件类型",
    dataIndex: "id_type",
    key: "id_type",
    search: true,
    render: (text, record) => record.id_type,
    valueType: "text",
  },
  {
    title: "身份证件号",
    dataIndex: "id_number",
    key: "id_number",
    search: true,
    render: (text, record) => record.id_number,
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
  headerTitle: "职工信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<Employee> = {
  name: "新职工姓名",
  birth_date: new Date().toISOString().split("T")[0], // 当前日期
  gender: "男",
  address: "新地址",
  phone_number: "12345678901",
  id_type: "身份证",
  id_number: "123456789012345678",
};

// 表单组件
export function EmployeeForm() {
  return (
    <ProForm.Group title="职工信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="employee_id"
        label="职工ID"
        disabled
        placeholder="请输入职工ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="birth_date"
        label="出生日期"
        placeholder="请选择出生日期"
        picker="date"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="gender"
        label="性别"
        placeholder="请选择性别"
        options={[
          { label: "男", value: "男" },
          { label: "女", value: "女" },
        ]}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="address"
        label="地址"
        placeholder="请输入地址"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="phone_number"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="id_type"
        label="身份证件类型"
        placeholder="请输入身份证件类型"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="id_number"
        label="身份证件号"
        placeholder="请输入身份证件号"
      />
    </ProForm.Group>
  );
}