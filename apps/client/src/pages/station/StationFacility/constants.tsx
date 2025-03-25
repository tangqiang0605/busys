import { ProColumnType, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
// import InfoAction from "./InfoAction";
import { Facility, deleteFacilityApi, updateFacilityApi } from "../../../apis/facility/facilityInfo";
import createInfoActionComponent from "../../../components/CommonAction";

type StationFacility = Facility & { location: 'station' }

const InfoAction = createInfoActionComponent<StationFacility>({
  entityName: '车站设施',
  idField: 'facility_id',
  updateApi: updateFacilityApi,
  deleteApi: deleteFacilityApi,
  FormComponent: FacilityForm,
});

// 表格列配置
export const tableColumns: ProColumnType<Facility>[] = [
  {
    title: "设施ID",
    dataIndex: "facility_id",
    key: "facility_id",
    search: true,
    render: (text, record) => record.facility_id,
    valueType: "text",
  },
  {
    title: "设施类型ID",
    dataIndex: "facility_type_id",
    key: "facility_type_id",
    search: true,
    render: (text, record) => record.facility_type_id,
    valueType: "text",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    search: false,
    render: (text, record) => record.description || "无描述",
    valueType: "text",
  },
  // {
  //   title: "位置",
  //   dataIndex: "location",
  //   key: "location",
  //   search: true,
  //   render: (text, record) => record.location,
  //   valueType: "text",
  // },
  {
    title: "所属车站ID",
    dataIndex: "owner_id",
    key: "owner_id",
    search: true,
    render: (text, record) => record.owner_id || "无所属",
    valueType: "text",
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    search: false,
    width: 100,
    render: (_, record) => {
      return <InfoAction record={record as StationFacility} />;
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
  headerTitle: "设施信息表",
  columns: tableColumns,
  scroll: { x: "max-content" },
};

// 默认表单值
export const defaultForm: Partial<Facility> = {
  facility_type_id: 1,
  location: "新位置",
};

// 表单组件
export function FacilityForm() {
  return (
    <ProForm.Group title="设施信息" layout="horizontal">
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="facility_type_id"
        label="设施类型ID"
        placeholder="请输入设施类型ID"
      />
      <ProFormTextArea
        width="md"
        name="description"
        label="描述"
        placeholder="请输入设施描述（可选）"
        fieldProps={{
          rows: 4,
        }}
      />
      <ProFormText
        rules={[{ required: true }]}
        width="md"
        name="location"
        label="位置"
        disabled
        placeholder="请输入设施位置"
      />
      <ProFormText
        width="md"
        name="owner_id"
        label="所属ID"
        placeholder="请输入所属ID（可选）"
      />
    </ProForm.Group>
  );
}