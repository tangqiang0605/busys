import { ProColumnType, ProForm, ProFormText, ProFormSwitch, ProFormDigit } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { User } from "../../../apis/user/userInfo";
// import { User } from "../";

// 表格列配置
export const tableColumns: ProColumnType<User>[] = [
  {
    title: "用户ID",
    dataIndex: "user_id",
    key: "user_id",
    search: true,
    render: (text, record) => record.user_id,
    valueType: "text",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    search: true,
    render: (text, record) => record.username,
    valueType: "text",
  },
  {
    title: "角色ID",
    dataIndex: "role_id",
    key: "role_id",
    search: true,
    render: (text, record) => record.role_id,
    valueType: "text",
  },
  {
    title: "角色名称",
    dataIndex: ["role", "role_name"],
    key: "role_name",
    search: true,
    render: (text, record) => record.role.role_name,
    valueType: "text",
  },
  {
    title: "允许的路由",
    dataIndex: ["role", "allowed_routes"],
    key: "role.allowed_routes",
    search: false,
    render: (text, record) => record.role.allowed_routes.join(", "),
    valueType: "text",
  },
  {
    title: "允许的操作",
    dataIndex: ["role", "allowed_actions"],
    key: "role.allowed_actions",
    search: false,
    render: (text, record) => record.role.allowed_actions.join(", "),
    valueType: "text",
  },
  {
    title: "是否激活",
    dataIndex: "is_active",
    key: "is_active",
    search: true,
    render: (text, record) => record.is_active ? "是" : "否",
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
    title: '密码',
    dataIndex: 'password_hash',
    key: 'password_hash',
    search: false,
    render: (text, record) => record.password_hash,

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
  headerTitle: "用户信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<User> = {
  username: "新用户名",
  password_hash: "新密码哈希",
  is_active: true,
  metadata: {
    driver_id: "",
  },
  role_id: 1,
};

// 表单组件
export function UserForm() {
  return (
    <ProForm.Group title="用户信息" layout="horizontal">
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="user_id"
        label="用户ID"
        disabled
        placeholder="请输入用户ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        // disabled
        name="new_password"
        label="密码哈希"
        placeholder="请输入密码哈希"
      />
      <ProFormSwitch
        rules={[{ required: true }]}
        width="md"
        name="is_active"
        label="是否激活"
        placeholder="请选择是否激活"
      />
      <ProFormDigit
        width="md"
        name="metadata.worker_id"
        label="职工id"
        placeholder="请输入职工ID（可选）"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="role_id"
        label="角色ID"
        placeholder="请输入角色ID"
      />
    </ProForm.Group>
  );
}