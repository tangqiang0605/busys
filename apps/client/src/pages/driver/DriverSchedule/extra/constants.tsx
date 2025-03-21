import { ProColumnType, ProForm, ProFormDatePicker, ProFormList, ProFormText } from "@ant-design/pro-components";
import InfoAction from "./InfoAction";
import { ExtraSchedule } from "../../../../apis/schedule/extraSchedule";
import { FormListItemRender } from "../../../../components/FormListItemRender";

// 表格列配置
export const tableColumns: ProColumnType<ExtraSchedule>[] = [
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
    title: "特殊班次",
    dataIndex: "special_schedule",
    key: "special_schedule",
    search: false,
    render: (text, record) => {
      return record.special_schedule.map((schedule, index) => (
        <div key={index}>
          <strong>日期 {index + 1}</strong>: {new Date(schedule.Date).toLocaleDateString()} - 路线ID: {schedule.routeIds.join(", ")}
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
    render: (text, record) => new Date(record.createdAt).toLocaleString(),
    valueType: "dateTime",
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    key: "updatedAt",
    search: false,
    render: (text, record) => new Date(record.updatedAt).toLocaleString(),
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
export const extraTableSettings = {
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
  headerTitle: "额外班次信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<ExtraSchedule> = {
  description: "新额外班次描述",
  special_schedule: [
    {
      Date: "2025-03-06T14:06:54.947Z",
      routeIds: [1],
    },
  ],
};

// 表单组件
export function ExtraScheduleForm() {
  return (
    <ProForm.Group title="额外班次信息" layout="horizontal">
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
      {/* <ProFormTextArea
        rules={[{ required: true }]}
        width="md"
        name="special_schedule"
        label="特殊班次"
        placeholder="请输入特殊班次，格式如：[{Date:'2025-03-06T14:06:54.947Z', routeIds:[1]}]"
        fieldProps={{
          rows: 4,
        }}
      /> */}
      <ProFormList
        name="special_schedule"
        itemRender={FormListItemRender}
        label="特殊班次"
      >
        <ProFormDatePicker name="Date" label="日期" />
        <ProFormText
          name="routeIds"
          label="路线班次id数组（逗号隔开）"
        />
        {/* </ProFormList> */}
      </ProFormList>

    </ProForm.Group>
  );
}