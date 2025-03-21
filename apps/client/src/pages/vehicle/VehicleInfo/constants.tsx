import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { Vehicle } from "../../../apis/vehicle/vehicle";

// 表格列配置
export const tableColumns: ProColumnType<Vehicle>[] = [
  {
    title: "车辆ID",
    dataIndex: "vehicle_id",
    key: "vehicle_id",
    search: true,
    render: (text, record) => record.vehicle_id,
    valueType: "text",
  },
  {
    title: "车牌号",
    dataIndex: "license_plate",
    key: "license_plate",
    search: true,
    render: (text, record) => record.license_plate,
    valueType: "text",
  },
  {
    title: "车辆类型",
    dataIndex: "vehicle_type",
    key: "vehicle_type",
    search: true,
    render: (text, record) => record.vehicle_type,
    valueType: "text",
  },
  {
    title: "载客量",
    dataIndex: "capacity",
    key: "capacity",
    search: true,
    render: (text, record) => record.capacity,
    valueType: "text",
  },
  {
    title: "购买日期",
    dataIndex: "purchase_date",
    key: "purchase_date",
    search: true,
    render: (text, record) => new Date(record.purchase_date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "车辆状态",
    dataIndex: "status",
    key: "status",
    search: true,
    render: (text, record) => record.status,
    valueType: "text",
  },
  {
    title: "车辆名称",
    dataIndex: "vehicle_name",
    key: "vehicle_name",
    search: true,
    render: (text, record) => record.vehicle_name,
    valueType: "text",
  },
  {
    title: "车辆价格",
    dataIndex: "price",
    key: "price",
    search: true,
    render: (text, record) => record.price,
    valueType: "text",
  },
  {
    title: "厂家",
    dataIndex: "manufacturer",
    key: "manufacturer",
    search: true,
    render: (text, record) => record.manufacturer,
    valueType: "text",
  },
  {
    title: "车型",
    dataIndex: "model",
    key: "model",
    search: true,
    render: (text, record) => record.model,
    valueType: "text",
  },
  {
    title: "车辆图片URL",
    dataIndex: "image_url",
    key: "image_url",
    search: false,
    render: (text, record) => record.image_url || "无图片",
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
  headerTitle: "车辆信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<Vehicle> = {
  license_plate: "新车牌号",
  vehicle_type: "电动",
  capacity: 5,
  purchase_date: new Date().toISOString(),
  status: "运行",
  vehicle_name: "新车辆名称",
  price: 100000,
  manufacturer: "新厂家",
  model: "新车型",
};

// 表单组件
export function VehicleForm() {
  return (
    <ProForm.Group title="车辆信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="vehicle_id"
        label="车辆ID"
        disabled
        placeholder="请输入车辆ID"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="license_plate"
        label="车牌号"
        placeholder="请输入车牌号"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="vehicle_type"
        label="车辆类型"
        placeholder="请选择车辆类型"
        options={[
          { label: "电动", value: "电动" },
          { label: "燃油", value: "燃油" },
        ]}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="capacity"
        label="载客量"
        placeholder="请输入载客量"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="purchase_date"
        label="购买日期"
        placeholder="请选择购买日期"
        picker="date"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="status"
        label="车辆状态"
        placeholder="请选择车辆状态"
        options={[
          { label: "运行", value: "运行" },
          { label: "维修", value: "维修" },
        ]}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="vehicle_name"
        label="车辆名称"
        placeholder="请输入车辆名称"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="price"
        label="车辆价格"
        placeholder="请输入车辆价格"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="manufacturer"
        label="厂家"
        placeholder="请输入厂家"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="model"
        label="车型"
        placeholder="请输入车型"
      />
      <ProFormText
        width="md"
        name="image_url"
        label="车辆图片URL"
        placeholder="请输入车辆图片URL（可选）"
      />
    </ProForm.Group>
  );
}