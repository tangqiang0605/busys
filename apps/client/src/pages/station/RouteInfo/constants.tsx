import { ProColumnType, ProForm, ProFormText } from "@ant-design/pro-components"
import { Route } from "../../../apis/route";
import InfoAction from "./InfoAction";

export const tableColumns: ProColumnType<Route>[] = [
  {
    title: '路线ID',
    dataIndex: 'route_id',
    key: 'route_id',
    search: true,
    render: (text, record) => record.route_id,
    valueType: 'text',
  },
  {
    title: '路线名称',
    dataIndex: 'route_name',
    key: 'route_name',
    search: true,
    render: (text, record) => record.route_name,
    valueType: 'text',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    search: true,
    render: (text, record) => record.created_at,
    valueType: 'dateTime', // 指定日期时间类型
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    search: true,
    render: (text, record) => record.updated_at,
    valueType: 'dateTime', // 指定日期时间类型
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    // width: 100, // 设置列宽
    render: (_, record) => {
      return <InfoAction record={record} />;
    },
  },
];

export const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "路线信息表",
  columns: tableColumns,
  scroll: { x: 'max-content' }
};

export const defaultForm: Partial<Route> = {
  route_name: '新路线',
};

export function RouteInfoForm() {
  return (
    <ProForm.Group title="路线信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true, message: '请输入路线名称' }]}
        width="md"
        name="route_name"
        label="路线名称"
        placeholder="请输入路线名称"
      />
    </ProForm.Group>
  );
}
export function RouteDetailForm() {
  // TODO djr 提供下拉选项选择车站，而不是目前的文本输入
  return (
    <ProForm.Group title="路线信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true, message: '请输入路线id' }]}
        width="md"
        name="route_id"
        label="路线id"
        disabled
        placeholder="请输入路线id"
      />
      <ProFormText
        rules={[{ required: true, message: '请输入车站id' }]}
        width="md"
        name="station_id"
        label="车站id"
        placeholder="请输入车站id"
      />
      {/* TODO djr 使用步长为1的数字选择器 */}
      <ProFormText
        rules={[{ required: true, message: '请输入车站顺序' }]}
        width="md"
        name="station_order"
        label="车站顺序"
        placeholder="请输入车站顺序"
      />

    </ProForm.Group>
  );
}