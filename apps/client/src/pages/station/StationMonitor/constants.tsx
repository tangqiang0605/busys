import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormDigit, ProFormDateTimePicker } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { StationSurveillance } from "../../../apis/station/stationSurveillance";

// 表格列配置
export const tableColumns: ProColumnType<StationSurveillance>[] = [
  {
    title: "监控信息ID",
    dataIndex: "surveillance_id",
    key: "surveillance_id",
    search: true,
    render: (text, record) => record.surveillance_id,
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
    title: "车站ID",
    dataIndex: "station_id",
    key: "station_id",
    search: true,
    render: (text, record) => record.station_id,
    valueType: "text",
  },
  {
    title: "时间戳",
    dataIndex: "timestamp",
    key: "timestamp",
    search: false,
    render: (text, record) => new Date(record.timestamp).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "乘客数量",
    dataIndex: "passenger_count",
    key: "passenger_count",
    search: true,
    render: (text, record) => record.passenger_count,
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
  headerTitle: "车站监控信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<StationSurveillance> = {
  facility_id: 1,
  station_id: 1,
  passenger_count: 0,
};

// 表单组件
export function StationSurveillanceForm() {
  return (
    <ProForm.Group title="车站监控信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="surveillance_id"
        label="监控信息ID"
        disabled
        placeholder="请输入监控信息ID"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="facility_id"
        label="设施ID"
        placeholder="请输入设施ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="station_id"
        label="车站ID"
        placeholder="请输入车站ID"
      />
      <ProFormDateTimePicker
        rules={[{ required: true }]}
        width="md"
        name="timestamp"
        label="时间戳"
        placeholder="请选择时间戳"
      // picker="datetime"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="passenger_count"
        label="乘客数量"
        placeholder="请输入乘客数量"
      />
    </ProForm.Group>
  );
}