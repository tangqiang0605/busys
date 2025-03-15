import { ProColumnType, ProForm, ProFormText } from "@ant-design/pro-components"
import { Station } from "../../../apis/station"
import InfoAction from "./InfoAction";

// 根据类型生成columns
export const tableColumns: ProColumnType<Station>[] = [
  {
    title: '车站ID',
    dataIndex: 'station_id',
    key: 'station_id',
    search: true,
    render: (text, record) => record.station_id,
    valueType: 'text',
  },
  {
    title: '车站名称',
    dataIndex: 'station_name',
    key: 'station_name',
    search: true,
    render: (text, record) => record.station_name,
    valueType: 'text',
  },
  {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
    search: true,
    render: (text, record) => record.location,
    valueType: 'text',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    search: true,
    render: (text, record) => record.created_at,
    valueType: 'dateTime', // 指定日期时间类型[^2^]
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    search: true,
    render: (text, record) => record.updated_at,
    valueType: 'dateTime', // 指定日期时间类型[^2^]
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100, // 设置列宽
    render: (_, record) => {
      return <InfoAction record={record} />
    },
  }
];

export const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "车站信息表",
  columns: tableColumns,
  scroll: { x: 'max-content' }
}

export const defaultForm: Partial<Station> = {
  "station_name": '车站',
  "location": "123,124"
}

export function StationInfoForm() {
  return (
    <ProForm.Group title="职工信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="station_name"
        label="车站名"
        placeholder="请输入"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="location"
        label="经纬度"
        placeholder="请输入"
      />
    </ProForm.Group>
  )
}