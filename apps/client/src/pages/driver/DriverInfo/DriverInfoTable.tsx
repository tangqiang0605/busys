import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  ProColumnType,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
  useDebounceFn,
} from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
import { Button, Popconfirm, PopconfirmProps, Space, message } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CreateDriver } from './DriverInfoForm';
import { createDriverApi, deleteDriverApi, getAllDriverApi } from '../../../apis/driver';
import { DirverInfo, DriverInfoFormData, DriverInfoTableData } from '../../../apis/types';
import { useSelector, useDispatch } from 'react-redux';
import { incremented } from '../../../store/driver';
import { RootState } from '../../../store';
import { DriverInfoActions } from './DriverInfoActions';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';

export const driverInfoColumns: ProColumnType<DriverInfoTableData>[] = [
  {
    title: '司机id',
    dataIndex: 'driver_id',
    key: 'driver_id',
    search: true, // 启用搜索功能
    render: (text, record) => record.driver_id,
    filters: true,
  },
  {
    title: '员工姓名',
    dataIndex: 'employee.name',
    key: 'employee.name',
    search: true, // 启用搜索功能
    render: (text, record) => record.employee.name,
  },
  {
    title: '出生日期',
    dataIndex: 'employee.birth_date',
    key: 'employee.birth_date',
    search: true,
    valueType: 'date', // 指定日期类型
    render: (text, record) => record.employee.birth_date,
  },
  {
    title: '性别',
    dataIndex: 'employee.gender',
    key: 'employee.gender',
    search: true,
    render: (text, record) => record.employee.gender,
  },
  {
    title: '地址',
    dataIndex: 'employee.address',
    key: 'employee.address',
    search: true,
    render: (text, record) => record.employee.address,
  },
  {
    title: '电话号码',
    dataIndex: 'employee.phone_number',
    key: 'employee.phone_number',
    search: true,
    render: (text, record) => record.employee.phone_number,
  },
  {
    title: '证件类型',
    dataIndex: 'employee.id_type',
    key: 'employee.id_type',
    search: true,
    render: (text, record) => record.employee.id_type,
  },
  {
    title: '证件号码',
    dataIndex: 'employee.id_number',
    key: 'employee.id_number',
    search: true,
    render: (text, record) => record.employee.id_number,
  },
  {
    title: '驾驶证类型',
    dataIndex: 'license_type',
    key: 'license_type',
    search: true,
    render: (text, record) => record.license_type,
  },
  {
    title: '驾驶证号码',
    dataIndex: 'license_number',
    key: 'license_number',
    search: true,
    render: (text, record) => record.license_number,
  },
  {
    title: '驾驶证有效期',
    dataIndex: 'license_expiry_date',
    key: 'license_expiry_date',
    search: true,
    valueType: 'date', // 指定日期类型
    render: (text, record) => record.license_expiry_date,
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 100, // 设置列宽
    render: (_, record) => {
      return <DriverInfoActions record={record} />
    },
  }
];

const columns: ProColumnType<DriverInfoFormData>[] = [
  {
    title: '姓名',
    // key: 'name',
    dataIndex: 'driver_id',
  },
  // {
  //   title: 'time',
  //   dataIndex: 'time',
  //   valueType: 'date',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   valueType: 'select',
  //   filters: true,
  //   onFilter: true,
  //   valueEnum: {
  //     london: {
  //       text: '伦敦',
  //     },
  //     'New York': {
  //       text: '纽约',
  //     },
  //   },
  // },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    valueType: 'option',
    render: () => [
      <a key="delete">Delete</a>,
      <a key="link" className="ant-dropdown-link">
        More actions <DownOutlined />
      </a>,
    ],
  },
];

const initConfig = {
  // bordered: true,
  // loading: false,
  // columns,
  // pagination: {
  //   show: true,
  //   pageSize: 5,
  //   current: 1,
  //   total: 100,
  // },
  // size: 'small',
  // expandable: false,
  // headerTitle: '高级表格',
  // tooltip: '高级表格 tooltip',
  // showHeader: true,
  // footer: true,
  // rowSelection: {},
  // scroll: false,
  // hasData: true,
  // tableLayout: undefined,
  // toolBarRender: true,
  // search: {
  //   show: "true",
  //   span: 12,
  //   collapseRender: true,
  //   labelWidth: 80,
  //   filterType: 'query',
  //   layout: 'horizontal',
  // },

};

const DynamicSettings = () => {
  // const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(initConfig);

  const refreshTable = useSelector((state: RootState) => state.driver.refreshTable);
  const [selections, setSelections] = useState<number[]>()

  const navigate = useNavigate();
  const onSubmit = async (values: DriverInfoFormData) => {
    console.log(values)
    const result = await createDriverApi(values)
    if (result.data) {
      message.success('创建成功')
    } else {
      message.error('创建失败')
      console.log('创建司机失败', result)
    }
  }

  const getData = getDataFnFactory<DirverInfo[]>(navigate, getAllDriverApi, 'driver_id')
  // const getData = useCallback(getDataFnFactory(navigate, getAllDriver), [navigate]);
  return (
    <ProCard
      split="vertical"
      bordered
      headerBordered
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProCard
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProTable
          rowSelection={{
            selectedRowKeys: selections,
            onChange(selectedRowKeys) {
              setSelections(selectedRowKeys as number[])
            }
          }}
          params={{ timestamp: refreshTable }}
          // filter={}
          request={getData}
          options={{
            density: true,
            fullScreen: true,
            setting: true,
          }}
          pagination={
            config.pagination?.show
              ? config.pagination
              : {
                pageSize: 5,
              }
          }
          toolBarRender={() => [
            <CreateDriver key="create_driver" title='新建司机' triggerRender={() => {

              return (<Button type="primary">
                <PlusOutlined />
                新建
              </Button>)
            }} onSubmit={onSubmit} />
          ]
          }
          headerTitle={"司机信息表"}
          columns={driverInfoColumns}
          scroll={{ x: 'max-content' }}
        // dataSource={data?.map(item => ({ ...item, key: item.driver_id }))}
        />
      </ProCard>
    </ProCard>
  );
};

export default DynamicSettings;