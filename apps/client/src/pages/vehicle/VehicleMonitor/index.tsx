import { PageContainer, ProFormDateTimePicker, ProFormDigit } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { SafetySurveillance, createSafetySurveillanceApi, deleteSafetySurveillanceApi, getAllSafetySurveillanceApi, updateSafetySurveillanceApi } from '../../../apis/vehicle/safetySurveillance';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";
import { dateTime2iso } from '../../../utils/time';

const InfoAction = createInfoActionComponent<SafetySurveillance>({
  entityName: '安全监控记录',
  idField: 'record_id',
  updateApi: updateSafetySurveillanceApi,
  deleteApi: deleteSafetySurveillanceApi,
  FormComponent: SafetySurveillanceForm,
});

// 表格列配置
const tableColumns: ProColumnType<SafetySurveillance>[] = [
  {
    title: "记录ID",
    dataIndex: "record_id",
    key: "record_id",
    search: true,
    render: (text, record) => record.record_id,
    valueType: "text",
  },
  {
    title: "监控时间",
    dataIndex: "timestamp",
    key: "timestamp",
    search: true,
    render: (text, record) => new Date(record.timestamp).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "监控内容",
    dataIndex: "report_content",
    key: "report_content",
    search: false,
    render: (text, record) => record.report_content,
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
  headerTitle: "安全监控记录表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<SafetySurveillance> = {
  facility_id: 1,
  report_content: '',
  timestamp: new Date().toISOString(), // 当前日期时间
};

// 表单组件
function SafetySurveillanceForm() {
  return (
    <ProForm.Group title="安全监控记录信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="record_id"
        label="记录ID"
        disabled
        placeholder="请输入记录ID"
      /> */}
      <ProFormDateTimePicker
        rules={[{ required: true }]}
        width="md"
        name="timestamp"
        label="监控时间"
        placeholder="请选择监控时间"
      // picker="datetime"
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="report_content"
        label="监控内容"
        placeholder="请输入监控内容"
      />
      <ProFormDigit
        rules={[{ required: true }]}
        width="md"
        name="facility_id"
        label="设施ID"
        placeholder="请输入设施ID"
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<SafetySurveillance> = {
  CreateFormItem: <SafetySurveillanceForm />,
  defaultForm,
  tableSettings,
  createItemApi: createSafetySurveillanceApi,
  getAllItemApi: getAllSafetySurveillanceApi,
  keyName: 'record_id',
  createItemValue: (values: SafetySurveillance) => {
    return {
      ...values,
      timestamp: dateTime2iso(values.timestamp)
    }
  }
};

/**
 * 安全监控记录信息管理
 * @returns 
 */
export default function SafetySurveillanceInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}