import { ProColumnType, ProForm, ProFormDigit, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Facility, createFacilityApi, deleteFacilityApi, getAllFacilityApi, updateFacilityApi } from "../../../apis/facility/facilityInfo";
import createInfoActionComponent from "../../../components/CommonAction";
import { CommonTalbeProps } from "../../../components/types";

type VehicleFacility = Facility & { location: 'vehicle' }

const InfoAction = createInfoActionComponent<VehicleFacility>({
  entityName: '车辆设施',
  idField: 'facility_id',
  updateApi: updateFacilityApi,
  deleteApi: deleteFacilityApi,
  FormComponent: FacilityForm,
});

// 表格列配置
const tableColumns: ProColumnType<Facility>[] = [
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
    title: "所属车辆ID",
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
      return <InfoAction record={record as VehicleFacility} />;
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
const defaultForm: Partial<VehicleFacility> = {
  facility_type_id: 1,
  location: "vehicle",
};

// 表单组件
function FacilityForm() {
  return (
    <ProForm.Group title="设施信息" layout="horizontal">
      <ProFormDigit
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
      <ProFormDigit
        width="md"
        name="owner_id"
        label="所属ID"
        placeholder="请输入所属ID（可选）"
      />
    </ProForm.Group>
  );
}

export const commonTableProps: CommonTalbeProps<Facility> = {
  CreateFormItem: <FacilityForm />,
  defaultForm,
  tableSettings: {},
  createItemApi: createFacilityApi,
  getAllItemApi: getAllFacilityApi,
  keyName: 'facility_id'
}