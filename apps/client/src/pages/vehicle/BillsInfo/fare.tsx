import { ProColumnType, ProForm, ProFormText, ProFormSelect, ProFormDigit } from "@ant-design/pro-components";
import { FareBills, createFareBillApi, deleteFareBillApi, getAllFareBillsApi, updateFareBillApi } from '../../../apis/vehicle/fareBills';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<FareBillsFormValue & { fare_bill_id: number }>({
  entityName: '车费账单',
  idField: 'fare_bill_id',
  updateApi: updateFareBillApi,
  deleteApi: deleteFareBillApi,
  FormComponent: FareBillsForm,
});

// 表格列配置
const tableColumns: ProColumnType<FareBills>[] = [
  {
    title: "车费账单ID",
    dataIndex: "fare_bill_id",
    key: "fare_bill_id",
    search: true,
    render: (text, record) => record.fare_bill_id,
    valueType: "text",
  },
  {
    title: "账单ID",
    dataIndex: "bill_id",
    key: "bill_id",
    search: true,
    render: (text, record) => record.bill_id,
    valueType: "text",
  },
  {
    title: "公交车ID",
    dataIndex: "vehicle_id",
    key: "vehicle_id",
    search: true,
    render: (text, record) => record.vehicle_id,
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
    title: "路线ID",
    dataIndex: "route_id",
    key: "route_id",
    search: true,
    render: (text, record) => record.route_id,
    valueType: "text",
  },
  {
    title: "账单金额",
    dataIndex: "bill.amount",
    key: "bill.amount",
    search: false,
    render: (text, record) => record.bill.amount,
    // valueType: "number",
  },
  {
    title: "账单描述",
    dataIndex: "bill.description",
    key: "bill.description",
    search: false,
    render: (text, record) => record.bill.description || '无',
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
      const { bill, ...rest } = record;
      return <InfoAction record={{ ...rest, ...bill } as any} />;
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
  headerTitle: "车费账单信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

interface FareBillsFormValue {
  vehicle_id: number,
  fare_type: string;
  route_id: number,
  bill_type: "车费",
  amount: number,
  description: string;
}

// 默认表单值
const defaultForm: Partial<FareBillsFormValue> = {
  vehicle_id: 1,
  fare_type: 'regular', // 默认票价类型为普通票价
  route_id: 1,
  bill_type: "车费",
  amount: 2.5,
  description: "车费账单描述"
  // bill_id: 1, // 默认关联的账单ID
};

// 表单组件
function FareBillsForm() {
  return (
    <ProForm.Group title="车费账单信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="fare_bill_id"
        label="车费账单ID"
        disabled
        placeholder="请输入车费账单ID"
      /> */}
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="bill_id"
        label="账单ID"
        placeholder="请输入账单ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="vehicle_id"
        label="公交车ID"
        placeholder="请输入公交车ID"
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
        name="route_id"
        label="路线ID"
        placeholder="请输入路线ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        disabled
        name="bill_type"
        label="账单类型"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="amount"
        label="费用"
        placeholder="请输入费用"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="description"
        label="账单描述"
      />
      {/* < */}
    </ProForm.Group>
  );
}

export const fareBillsTalbeProps: CommonTalbeProps<FareBills> = {
  CreateFormItem: <FareBillsForm />,
  defaultForm,
  tableSettings,
  createItemApi: createFareBillApi,
  getAllItemApi: getAllFareBillsApi,
  keyName: 'fare_bill_id'
};

// /**
//  * 车费账单信息管理
//  * @returns 
//  */
// export default function FareBillsInfo() {
//   return (
//     <div>
//       <PageContainer>
//         <CommonTable {...commonTalbeProps} />
//       </PageContainer>
//     </div>
//   )
// }