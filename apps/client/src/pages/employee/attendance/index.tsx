import { PageContainer } from '@ant-design/pro-components';
import CommonTable from '../../../components/CommonTable';
import { ProColumnType, ProForm, ProFormText, ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components";
import { Attendance, createAttendanceApi, deleteAttendanceApi, getAllAttendanceApi, updateAttendanceApi } from '../../../apis/employee/attendance';
import createInfoActionComponent from '../../../components/CommonAction';
import { CommonTalbeProps } from "../../../components/types";

const InfoAction = createInfoActionComponent<Attendance>({
  entityName: '员工考勤',
  idField: 'attendance_id',
  updateApi: updateAttendanceApi,
  deleteApi: deleteAttendanceApi,
  FormComponent: AttendanceForm,
});

// 表格列配置
const tableColumns: ProColumnType<Attendance>[] = [
  {
    title: "考勤记录ID",
    dataIndex: "attendance_id",
    key: "attendance_id",
    search: true,
    render: (text, record) => record.attendance_id,
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
    title: "考勤日期",
    dataIndex: "date",
    key: "date",
    search: true,
    render: (text, record) => new Date(record.date).toLocaleDateString(),
    valueType: "date",
  },
  {
    title: "签到时间",
    dataIndex: "sign_in_time",
    key: "sign_in_time",
    search: false,
    render: (text, record) => record.sign_in_time ? new Date(record.sign_in_time).toLocaleTimeString() : "-",
    valueType: "time",
  },
  {
    title: "签退时间",
    dataIndex: "sign_out_time",
    key: "sign_out_time",
    search: false,
    render: (text, record) => record.sign_out_time ? new Date(record.sign_out_time).toLocaleTimeString() : "-",
    valueType: "time",
  },
  {
    title: "考勤状态",
    dataIndex: "status",
    key: "status",
    search: true,
    render: (text, record) => record.status,
    valueType: "select",
    valueEnum: {
      normal: { text: '正常' },
      late: { text: '迟到' },
      early: { text: '早退' },
      absent: { text: '缺勤' },
    },
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
  headerTitle: "员工考勤信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
const defaultForm: Partial<Attendance> = {
  employee_id: 1,
  date: new Date().toISOString().split("T")[0], // 当前日期
  status: 'normal', // 默认考勤状态为正常
};

// 表单组件
function AttendanceForm() {
  return (
    <ProForm.Group title="员工考勤信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="attendance_id"
        label="考勤记录ID"
        disabled
        placeholder="请输入考勤记录ID"
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="employee_id"
        label="职工ID"
        placeholder="请输入职工ID"
      />
      <ProFormDatePicker
        rules={[{ required: true }]}
        width="md"
        name="date"
        label="考勤日期"
        placeholder="请选择考勤日期"
        picker="date"
      />
      <ProFormDatePicker
        width="md"
        name="sign_in_time"
        label="签到时间"
        placeholder="请选择签到时间（可选）"
        picker="time"
      />
      <ProFormDatePicker
        width="md"
        name="sign_out_time"
        label="签退时间"
        placeholder="请选择签退时间（可选）"
        picker="time"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        width="md"
        name="status"
        label="考勤状态"
        placeholder="请选择考勤状态"
        valueEnum={{
          normal: { text: '正常' },
          late: { text: '迟到' },
          early: { text: '早退' },
          absent: { text: '缺勤' },
        }}
      />
    </ProForm.Group>
  );
}

const commonTalbeProps: CommonTalbeProps<Attendance> = {
  CreateFormItem: <AttendanceForm />,
  defaultForm,
  tableSettings,
  createItemApi: createAttendanceApi,
  getAllItemApi: getAllAttendanceApi,
  keyName: 'attendance_id'
};

/**
 * 员工考勤信息管理
 * @returns 
 */
export default function AttendanceInfo() {
  return (
    <div>
      <PageContainer>
        <CommonTable {...commonTalbeProps} />
      </PageContainer>
    </div>
  )
}