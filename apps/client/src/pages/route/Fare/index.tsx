import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormDatePicker, ProFormTextArea, ProFormSelect } from "@ant-design/pro-components";
import { Fare, createFareApi, deleteFareApi, getAllFareApi, updateFareApi } from '../../../apis/route/fare';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";
import { ymd2iso } from '../../../utils/time';

const InfoAction = createInfoActionComponent<Fare>({
  entityName: '票价信息',
  idField: 'fare_id',
  updateApi: updateFareApi,
  deleteApi: deleteFareApi,
  FormComponent: FareForm,
});

// 表格列配置
const tableColumns: ProColumnType<Fare>[] = [
  {
    title: "票价ID",
    dataIndex: "fare_id",
    key: "fare_id",
    search: true,
    render: (text, record) => record.fare_id,
    valueType: "text",
  },
  {
    title: "路线ID",
    dataIndex: "route_id",
    key: "route_id",
    search: true,
    render: (text, record) => record.route_id,
    valueType: "text",
  },
  {
    title: "票价类型",
    dataIndex: "fare_type",
    key: "fare_type",
    search: true,
    render: (text, record) => record.fare_type,
    valueType: "select",
    valueEnum: {
      regular: { text: '普通票价' },
      student: { text: '学生票' },
      // 可以根据实际需求添加更多票价类型
    },
  },
  {
    title: "票价金额",
    dataIndex: "price",
    key: "price",
    search: false,
    render: (text, record) => record.price,
    // valueType: "number",
  },
  {
    title: "适用开始日期",
    dataIndex: "start_date",
    key: "start_date",
    search: false,
    render: (text, record) => record.start_date ? new Date(record.start_date).toLocaleDateString() : '无',
    valueType: "date",
  },
  {
    title: "适用结束日期",
    dataIndex: "end_date",
    key: "end_date",
    search: false,
    render: (text, record) => record.end_date ? new Date(record.end_date).toLocaleDateString() : '无',
    valueType: "date",
  },
  {
    title: "票价描述",
    dataIndex: "description",
    key: "description",
    search: false,
    render: (text, record) => record.description || '无',
    valueType: "text",
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "created_at",
  //   key: "created_at",
  //   search: false,
  //   render: (text, record) => new Date(record.created_at).toLocaleString(),
  //   valueType: "dateTime",
  // },
  // {
  //   title: "更新时间",
  //   dataIndex: "updated_at",
  //   key: "updated_at",
  //   search: false,
  //   render: (text, record) => new Date(record.updated_at).toLocaleString(),
  //   valueType: "dateTime",
  // },
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
  headerTitle: "票价信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<Fare> = {
  route_id: 1,
  fare_type: 'regular', // 默认票价类型为普通票价
  price: 0, // 默认票价金额为 0
};

// 表单组件
function FareForm() {
  return (
    <ProForm.Group title="票价信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="fare_id"
        label="票价ID"
        disabled
        placeholder="请输入票价ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="route_id"
        label="路线ID"
        placeholder="请输入路线ID"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="fare_type"
        label="票价类型"
        placeholder="请选择票价类型"
        valueEnum={{
          regular: { text: '普通票价' },
          student: { text: '学生票' },
          // 可以根据实际需求添加更多票价类型
        }}
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="price"
        label="票价金额"
        placeholder="请输入票价金额"
      />
      <ProFormDatePicker
        width="md"
        name="start_date"
        label="适用开始日期"
        placeholder="请选择适用开始日期（可选）"
        picker="date"
      />
      <ProFormDatePicker
        width="md"
        name="end_date"
        label="适用结束日期"
        placeholder="请选择适用结束日期（可选）"
        picker="date"
      />
      <ProFormTextArea
        width="md"
        name="description"
        label="票价描述"
        placeholder="请输入票价描述（可选）"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<Fare> = {
  CreateFormItem: <FareForm />,
  defaultForm,
  tableSettings,
  createItemApi: createFareApi,
  getAllItemApi: getAllFareApi,
  keyName: 'fare_id',
  createItemValue: (values) => {
    if (values.start_date) {
      values.start_date = ymd2iso(values.start_date)
    }
    if (values.end_date) {
      values.end_date = ymd2iso(values.end_date)
    }
    return values
  }
};

/**
 * 票价信息管理
 * @returns 
 */
export default function FareInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}