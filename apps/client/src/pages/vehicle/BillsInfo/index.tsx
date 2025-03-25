import { PageContainer } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormTextArea, ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components";
import { Bills, createBillApi, deleteBillApi, getAllBillsApi, updateBillApi } from '../../../apis/station/bills';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

// TODO 目前是所有账单，应该分为，车辆维修 和 乘客车费 两个表

const InfoAction = createInfoActionComponent<Bills>({
  entityName: '账单',
  idField: 'bill_id',
  updateApi: updateBillApi,
  deleteApi: deleteBillApi,
  FormComponent: BillForm,
});

// 表格列配置
const tableColumns: ProColumnType<Bills>[] = [
  {
    title: "账单ID",
    dataIndex: "bill_id",
    key: "bill_id",
    search: true,
    render: (text, record) => record.bill_id,
    valueType: "text",
  },
  {
    title: "账单类型",
    dataIndex: "bill_type",
    key: "bill_type",
    search: true,
    render: (text, record) => record.bill_type,
    valueType: "select",
    valueEnum: {
      car_fee: { text: '车费' },
      maintenance_fee: { text: '维修费' },
      // 可以根据实际需求添加更多账单类型
    },
  },
  {
    title: "账单金额",
    dataIndex: "amount",
    key: "amount",
    search: false,
    render: (text, record) => record.amount,
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
    title: "账单描述",
    dataIndex: "description",
    key: "description",
    search: false,
    render: (text, record) => record.description || '无',
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
const tableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "账单信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<Bills> = {
  bill_type: 'car_fee', // 默认账单类型为车费
  amount: 0, // 默认金额为 0
};

// 表单组件
function BillForm() {
  return (
    <ProForm.Group title="账单信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="bill_id"
        label="账单ID"
        disabled
        placeholder="请输入账单ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="created_at"
        label="创建时间"
        placeholder="请选择创建时间"
        picker="datetime"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="bill_type"
        label="账单类型"
        placeholder="请选择账单类型"
        valueEnum={{
          car_fee: { text: '车费' },
          maintenance_fee: { text: '维修费' },
          // 可以根据实际需求添加更多账单类型
        }}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="amount"
        label="账单金额"
        placeholder="请输入账单金额"
      />
      <ProFormTextArea
        width="md"
        name="description"
        label="账单描述"
        placeholder="请输入账单描述（可选）"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<Bills> = {
  CreateFormItem: <BillForm />,
  defaultForm,
  tableSettings,
  createItemApi: createBillApi,
  getAllItemApi: getAllBillsApi,
  keyName: 'bill_id'
};

/**
 * 账单信息管理
 * @returns 
 */
export default function BillsInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}