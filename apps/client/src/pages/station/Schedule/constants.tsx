import { ProColumnType, ProForm, ProFormText, ProFormTimePicker } from "@ant-design/pro-components"
import InfoAction from "./InfoAction";
import { RouteSchedule } from "../../../apis/route/routeSchedule";

// 表格列配置
export const tableColumns: ProColumnType<RouteSchedule>[] = [
  {
    title: '班次ID',
    dataIndex: 'schedule_id',
    key: 'schedule_id',
    search: true,
    render: (text, record) => record.schedule_id,
    valueType: 'text',
  },
  {
    title: '路线ID',
    dataIndex: 'route_id',
    key: 'route_id',
    search: true,
    render: (text, record) => record.route_id,
    valueType: 'text',
  },
  {
    title: '班次名称',
    dataIndex: 'schedule_name',
    key: 'schedule_name',
    search: true,
    render: (text, record) => record.schedule_name,
    valueType: 'text',
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    key: 'start_time',
    search: true,
    render: (text, record) => record.start_time,
    valueType: 'time', // 使用时间类型
  },
  {
    title: '结束时间',
    dataIndex: 'end_time',
    key: 'end_time',
    search: false,
    render: (text, record) => record.end_time,
    valueType: 'time', // 使用时间类型
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    search: false,
    render: (text, record) => record.created_at,
    valueType: 'dateTime', // 指定日期时间类型
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    search: false,
    render: (text, record) => record.updated_at,
    valueType: 'dateTime', // 指定日期时间类型
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    search: false,
    width: 100, // 设置列宽
    render: (_, record) => {
      return <InfoAction record={record} />;
    },
  }
];

// 表格设置
export const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "班次信息表",
  columns: tableColumns,
  scroll: { x: 'max-content' }
};

// 默认表单值
export const defaultForm: Partial<RouteSchedule> = {
  schedule_name: '新班次',
  start_time: '08:00:00',
  end_time: '17:00:00',
};

// 表单组件
export function RouteScheduleForm() {
  return (
    <ProForm.Group title="班次信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="schedule_id"
        label="班次id"
        disabled
        placeholder="请输入班次id"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="schedule_name"
        label="班次名称"
        placeholder="请输入班次名称"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="route_id"
        label="路线id"
        placeholder="请输入路线id"
      />
      <ProFormTimePicker
        rules={[{ required: true }]}
        width="md"
        name="start_time"
        label="开始时间"
        placeholder="请选择开始时间"
      // value
      // format="HH:mm:ss" // 设置显示格式
      // valueFormat="HH:mm:ss" // 设置值的格式
      // pickerProps={{
      //   format: "HH:mm:ss", // 为内部的 TimePicker 设置格式
      //   use12Hours: false, // 使用24小时制
      // }}
      />
      <ProFormTimePicker
        rules={[{ required: true }]}
        width="md"
        name="end_time"
        label="结束时间"
        placeholder="请选择结束时间"
      // 不可用 format="HH:mm:ss"
      // 不可用 valueFormat="HH:mm:ss"
      />
    </ProForm.Group>
  );
}