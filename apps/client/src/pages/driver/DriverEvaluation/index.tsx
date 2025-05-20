import { PageContainer, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormTextArea } from "@ant-design/pro-components";
import { PerformanceEvaluations, createPerformanceEvaluationsApi, deletePerformanceEvaluationsApi, getAllDriverEvaluationsApi,  updatePerformanceEvaluationsApi } from '../../../apis/employee/performanceEvaluations';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";
import { ymd2iso } from '../../../utils/time';

const InfoAction = createInfoActionComponent<PerformanceEvaluations>({
  entityName: '绩效评估',
  idField: 'evaluation_id',
  updateApi: updatePerformanceEvaluationsApi,
  deleteApi: deletePerformanceEvaluationsApi,
  FormComponent: PerformanceEvaluationsForm,
});

// 表格列配置
const tableColumns: ProColumnType<PerformanceEvaluations>[] = [
  {
    title: "绩效评估ID",
    dataIndex: "evaluation_id",
    key: "evaluation_id",
    search: true,
    render: (text, record) => record.evaluation_id,
    valueType: "text",
  },
  {
    title: "职工ID",
    dataIndex: "employee_id",
    key: "employee_id",
    search: true,
    render: (text, record) => record.employee_id,
    valueType: "text",
  },
  {
    title: "评估日期",
    dataIndex: "evaluation_date",
    key: "evaluation_date",
    search: true,
    render: (text, record) => new Date(record.evaluation_date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "总评分",
    dataIndex: "total_score",
    key: "total_score",
    search: false,
    render: (text, record) => record.total_score,
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
  headerTitle: "绩效评估信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<PerformanceEvaluations> = {
  employee_id: 1,
  evaluation_date: new Date().toISOString().split("T")[0], // 当前日期
  metrics: {}, // 默认为空 JSON 对象
  total_score: 0, // 默认总评分为 0
};

// 表单组件
function PerformanceEvaluationsForm() {
  return (
    <ProForm.Group title="绩效评估信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="evaluation_id"
        label="绩效评估ID"
        disabled
        placeholder="请输入绩效评估ID"
      /> */}
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="employee_id"
        label="职工ID"
        placeholder="请输入职工ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="evaluation_date"
        label="评估日期"
        placeholder="请选择评估日期"
        picker="date"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="metrics"
        label="评估指标"
        placeholder="请输入评估指标（JSON格式）"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="total_score"
        label="总评分"
        placeholder="请输入总评分"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<PerformanceEvaluations> = {
  CreateFormItem: <PerformanceEvaluationsForm />,
  defaultForm,
  tableSettings,
  createItemApi: createPerformanceEvaluationsApi,
  getAllItemApi: getAllDriverEvaluationsApi,
  keyName: 'evaluation_id',
      createItemValue: (values) => {
    if (values.evaluation_date) {
      values.evaluation_date = ymd2iso(values.evaluation_date)
    }
    return values
  }
};

/**
 * 绩效评估信息管理（司机异化）
 * @returns 
 */
export default function DriverEvaluationsInfo() {
  // const refreshTalbe=useSelector((state:RootState)=>state.common.refreshTable)
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}