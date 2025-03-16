import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  ProColumnType,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProTable,
  useDebounceFn,
} from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
import { Button, Popconfirm, PopconfirmProps, Space, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CreateDriver } from './DriverInfoForm';
import { createDriverApi, deleteDriverApi, getAllDriverApi } from '../../../apis/driver';
import { DriverInfoFormData, DriverInfoTableData } from '../../../apis/types';
import { useSelector, useDispatch } from 'react-redux';
import { incremented } from '../../../store/driver';
import { RootState } from '../../../store';
import { DriverInfoActions } from './DriverInfoActions';
import { useNavigate } from 'react-router';



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

const DynamicSettings = () => {
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
          request={async (params, sort, filter) => {
            //  TODO 当列出于筛选或者排序的时候，也应该进行处理
            // https://ant-design.antgroup.com/components/table-cn#table-demo-head 筛选与排序
            console.log('', params, sort, filter);
            const { current, pageSize, ...restParams } = params;
            console.log(params)
            const query = {
              pageNum: current,
              pageSize,
              ...restParams
            }
            const result = await getAllDriverApi(query)
            if (result.statusCode === 401) {
              navigate('/login')
              return { data: [] }
            }
            const data = result?.data?.data?.map(item => ({ ...item, key: item.driver_id }))
            console.log('getAllDriver', result)

            return {
              data: data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: result?.data?.total,
            };

          }}
          options={{
            density: true,
            fullScreen: true,
            setting: true,
          }}
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