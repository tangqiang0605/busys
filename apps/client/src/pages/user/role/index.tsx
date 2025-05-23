import { PageContainer, ProFormList, ProFormSelect } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Role, createRoleApi, deleteRoleApi, getAllRolesApi, updateRoleApi } from '../../../apis/user/role';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";
import { FormListItemRender } from '../../../components/FormListItemRender';
import { menuAndRouteData } from '../../../routes/config';
import { generateRouteActions } from '../../../routes/format';
import { useMemo } from 'react';

const InfoAction = createInfoActionComponent<Role>({
  entityName: '角色权限',
  idField: 'role_id',
  updateApi: updateRoleApi,
  deleteApi: deleteRoleApi,
  FormComponent: RoleForm,
});

// 表格列配置
const tableColumns: ProColumnType<Role>[] = [
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
    dataIndex: "role_name",
    key: "role_name",
    search: true,
    render: (text, record) => record.role_name,
    valueType: "text",
  },
  {
    title: "允许访问的路由",
    dataIndex: "allowed_routes",
    key: "allowed_routes",
    search: false,
    render: (text, record) => record.allowed_routes.join(', '),
    valueType: "text",
  },
  {
    title: "允许执行的操作",
    dataIndex: "allowed_actions",
    key: "allowed_actions",
    search: false,
    render: (text, record) => record.allowed_actions.join(', '),
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
  headerTitle: "角色权限表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<Role> = {
  role_name: '',
  allowed_routes: [],
  allowed_actions: [],
};

// 定义操作权限选项
const actionOptions = [
  { label: '允许通过物品审批', value: 'approve_items' },
  { label: '允许通过新闻审批', value: 'approve_news' },
  { label: '允许删除用户', value: 'delete_user' },
  // 其他操作权限...
];

// const routeActions = 

// 表单组件
function RoleForm() {
  const routeActions = useMemo(() => { return generateRouteActions(menuAndRouteData) }, [])
  return (
    <ProForm.Group title="角色权限信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="role_id"
        label="角色ID"
        disabled
        placeholder="请输入角色ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="role_name"
        label="角色名称"
        placeholder="请输入角色名称"
      />
      <ProFormSelect
        mode="multiple"
        // rules={[{ required: true }]}
        width="md"
        name="allowed_routes"
        label="允许访问的路由"
        options={routeActions}
      // rules={[{ required: true, message: '至少需要选择一个路由' }]}
      />
      <ProFormSelect
        mode="multiple"
        name="allowed_actions"
        label="允许执行的操作"
        placeholder="请选择允许执行的操作"
        options={actionOptions}
        rules={[{ required: true, message: '至少需要选择一个操作' }]}
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<Role> = {
  CreateFormItem: <RoleForm />,
  defaultForm,
  tableSettings,
  createItemApi: createRoleApi,
  getAllItemApi: getAllRolesApi,
  keyName: 'role_id'
};

/**
 * 角色权限信息管理
 * @returns 
 */
export default function RoleInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}