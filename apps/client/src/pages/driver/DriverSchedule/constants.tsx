import { ProColumnType, ProForm, ProFormList, ProFormText } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { FixedSchedule } from "../../../apis/schedule/fixedSchedule";
import { FormListItemRender } from "../../../components/FormListItemRender";

// 表格列配置
export const tableColumns: ProColumnType<FixedSchedule>[] = [
  {
    title: "班次ID",
    dataIndex: "schedule_id",
    key: "schedule_id",
    search: true,
    render: (text, record) => record.schedule_id,
    valueType: "text",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    search: true,
    render: (text, record) => record.description,
    valueType: "text",
  },
  {
    title: "详情",
    dataIndex: "weekly_schedule",
    key: "weekly_schedule",
    search: false,
    render: (text, record) => {
      return record.weekly_schedule.map((schedule, index) => (
        <div key={index}>
          <strong>周 {index + 1}</strong>: {schedule.routeIds.join(", ")}
        </div>
      ));
    },
    valueType: "text",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
    search: false,
    render: (text, record) => record.createdAt,
    valueType: "dateTime",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    key: "updatedAt",
    search: false,
    render: (text, record) => record.updatedAt,
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
  headerTitle: "固定班次信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<FixedSchedule> = {
  description: "新固定班次描述",
  weekly_schedule: [
    {
      routeIds: [1, 2, 3],
    },
  ],
};

// 表单组件
export function FixedScheduleForm() {
  return (
    <ProForm.Group title="固定班次信息" layout="horizontal">
      {/* <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="schedule_id"
        label="班次ID"
        disabled
        placeholder="请输入班次ID"
      /> */}
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="description"
        label="描述"
        placeholder="请输入描述"
      />

      <ProFormList
        name="weekly_schedule"
        itemRender={FormListItemRender}
        label="每日班次"
      >
        <ProFormText
          name="routeIds"
          label="路线班次id数组（逗号隔开）"
        />
        {/* </ProFormList> */}
      </ProFormList>
    </ProForm.Group >
  );
}