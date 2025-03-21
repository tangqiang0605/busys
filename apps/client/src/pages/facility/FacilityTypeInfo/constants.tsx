import { ProColumnType, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { FacilityTypes } from "../../../apis/facility/facilityType";

// 表格列配置
export const tableColumns: ProColumnType<FacilityTypes>[] = [
  {
    title: "类型ID",
    dataIndex: "type_id",
    key: "type_id",
    search: true,
    render: (text, record) => record.type_id,
    valueType: "text",
  },
  {
    title: "类型名称",
    dataIndex: "type_name",
    key: "type_name",
    search: true,
    render: (text, record) => record.type_name,
    valueType: "text",
  },
  {
    title: "类型描述",
    dataIndex: "type_description",
    key: "type_description",
    search: false,
    render: (text, record) => record.type_description || "无描述",
    valueType: "text",
  },
  {
    title: "设施图片URL",
    dataIndex: "image_url",
    key: "image_url",
    search: false,
    render: (text, record) => record.image_url || "无图片",
    valueType: "text",
  },
  {
    title: "设施价格",
    dataIndex: "price",
    key: "price",
    search: true,
    render: (text, record) => record.price,
    valueType: "text",
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
  headerTitle: "设施类型信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<FacilityTypes> = {
  type_name: "新设施类型",
  price: 0.0,
};

// 表单组件
export function FacilityTypesForm() {
  return (
    <ProForm.Group title="设施类型信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="type_id"
        label="类型ID"
        disabled
        placeholder="请输入类型ID"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="type_name"
        label="类型名称"
        placeholder="请输入类型名称"
      />
      <ProFormTextArea
        width="md"
        name="type_description"
        label="类型描述"
        placeholder="请输入类型描述（可选）"
        fieldProps={{
          rows: 4,
        }}
      />
      <ProFormText
        width="md"
        name="image_url"
        label="设施图片URL"
        placeholder="请输入设施图片URL（可选）"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="price"
        label="设施价格"
        placeholder="请输入设施价格"
      />
    </ProForm.Group>
  );
}