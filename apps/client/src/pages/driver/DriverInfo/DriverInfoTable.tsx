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
import { createDriverApi, deleteDriverApi, getAllDriver } from '../../../apis/driver';
import { DriverInfoFormData, DriverInfoTableData } from '../../../apis/types';
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

  const getData = getDataFnFactory(navigate, getAllDriver)
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
      {/* <ProForm
        layout="inline"
        initialValues={initData}
        submitter={false}
        colon={false}
        onValuesChange={(_, values) => updateConfig.run(values)}
      >
        <ProCard
          colSpan="470px"
          style={{
            height: '100vh',
            overflow: 'auto',
            boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
            top: 0,
            right: 0,
            width: 470,
          }}
          tabs={{
            items: [
              {
                label: '基本配置',
                key: 'tab1',
                children: (
                  <>
                    <ProForm.Group
                      title="表格配置"
                      size={0}
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                    >
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="边框"
                        tooltip="bordered"
                        name="bordered"
                      />
                      <ProFormRadio.Group
                        tooltip={`size="middle"`}
                        radioType="button"
                        fieldProps={{
                          size: 'small',
                        }}
                        label="尺寸"
                        options={[
                          {
                            label: '大',
                            value: 'default',
                          },
                          {
                            label: '中',
                            value: 'middle',
                          },
                          {
                            label: '小',
                            value: 'small',
                          },
                        ]}
                        name="size"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="加载中"
                        tooltip="loading"
                        name="loading"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="显示标题"
                        tooltip="showHeader"
                        name="showHeader"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="支持展开"
                        tooltip="expandable"
                        name="expandable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="行选择"
                        tooltip="rowSelection"
                        name="rowSelection"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      size={0}
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                      tooltip="toolBarRender={false}"
                      title="工具栏"
                      extra={
                        <ProFormSwitch
                          fieldProps={{
                            size: 'small',
                          }}
                          noStyle
                          name="toolBarRender"
                        />
                      }
                    >
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="Icon 显示"
                        name={['options', 'show']}
                        tooltip="options={false}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="密度 Icon"
                        name={['options', 'density']}
                        tooltip="options={{ density:false }}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="keyWords"
                        name={['options', 'search']}
                        tooltip="options={{ search:'keyWords' }}"
                      />
                      <ProFormSwitch
                        label="全屏 Icon"
                        fieldProps={{
                          size: 'small',
                        }}
                        name={['options', 'fullScreen']}
                        tooltip="options={{ fullScreen:false }}"
                      />
                      <ProFormSwitch
                        label="列设置 Icon"
                        fieldProps={{
                          size: 'small',
                        }}
                        tooltip="options={{ setting:false }}"
                        name={['options', 'setting']}
                      />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '表单配置',
                key: 'tab3',
                children: (
                  <ProForm.Group
                    title="查询表单"
                    size={0}
                    collapsible
                    tooltip="search={false}"
                    direction="horizontal"
                    labelLayout="twoLine"
                    extra={
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        noStyle
                        name={['search', 'show']}
                      />
                    }
                  >
                    <ProFormText
                      label="查询按钮文案"
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={`search={{searchText:"查询"}}`}
                      name={['search', 'searchText']}
                    />
                    <ProFormText
                      label="重置按钮文案"
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={`search={{resetText:"重置"}}`}
                      name={['search', 'resetText']}
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="收起按钮"
                      tooltip={`search={{collapseRender:false}}`}
                      name={['search', 'collapseRender']}
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="表单收起"
                      name={['search', 'collapsed']}
                      tooltip={`search={{collapsed:false}}`}
                    />
                    <ProFormSelect
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={`search={{span:8}}`}
                      options={[
                        {
                          label: '24',
                          value: 24,
                        },
                        {
                          label: '12',
                          value: 12,
                        },
                        {
                          label: '8',
                          value: 8,
                        },
                        {
                          label: '6',
                          value: 6,
                        },
                      ]}
                      label="表单栅格"
                      name={['search', 'span']}
                    />
                    <ProFormRadio.Group
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      name={['search', 'layout']}
                      tooltip={`search={{layout:"${config.search?.layout}"}}`}
                      options={[
                        {
                          label: '垂直',
                          value: 'vertical',
                        },
                        {
                          label: '水平',
                          value: 'horizontal',
                        },
                      ]}
                      label="表单布局"
                    />
                    <ProFormRadio.Group
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      name={['search', 'filterType']}
                      tooltip={`search={{filterType:"light"}}`}
                      options={[
                        {
                          label: '默认',
                          value: 'query',
                        },
                        {
                          label: '轻量',
                          value: 'light',
                        },
                      ]}
                      label="表单类型"
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '数据配置',
                key: 'tab2',
                children: (
                  <ProForm.Group
                    title="分页器"
                    size={0}
                    collapsible
                    tooltip="pagination={}"
                    direction="horizontal"
                    labelLayout="twoLine"
                    extra={
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        noStyle
                        name={['pagination', 'show']}
                      />
                    }
                  >
                    <ProFormRadio.Group
                      tooltip={`pagination={size:"middle"}`}
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      label="尺寸"
                      options={[
                        {
                          label: '默认',
                          value: 'default',
                        },
                        {
                          label: '小',
                          value: 'small',
                        },
                      ]}
                      name={['pagination', 'size']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="页码"
                      tooltip={`pagination={{ current:10 }}`}
                      name={['pagination', 'current']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="每页数量"
                      tooltip={`pagination={{ pageSize:10 }}`}
                      name={['pagination', 'pageSize']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="数据总数"
                      tooltip={`pagination={{ total:100 }}`}
                      name={['pagination', 'total']}
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '列配置',
                key: 'tab4',
                children: (
                  <ProFormList
                    name="columns"
                    itemRender={({ listDom, action }) => {
                      return (
                        <ProCard
                          bordered
                          style={{
                            marginBlockEnd: 8,
                            position: 'relative',
                          }}
                          bodyStyle={{
                            padding: 8,
                            paddingInlineEnd: 16,
                            paddingBlockStart: 16,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: -4,
                              right: 2,
                            }}
                          >
                            {action}
                          </div>
                          {listDom}
                        </ProCard>
                      );
                    }}
                  >
                    <ProFormText
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="title"
                      label="标题"
                    />
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                    >
                      <ProFormSwitch label="过长省略" name="ellipsis" />
                      <ProFormSwitch label="复制按钮" name="copyable" />
                    </ProFormGroup>
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                      size={8}
                    >
                      <ProFormSelect
                        label="dataIndex"
                        width="xs"
                        name="dataIndex"
                        valueEnum={{
                          age: 'age',
                          address: 'address',
                          name: 'name',
                          time: 'time',
                          description: 'string',
                        }}
                      />
                      <ProFormSelect
                        width="xs"
                        label="值类型"
                        name="valueType"
                        fieldProps={{
                          onChange: () => {
                            ref.current?.resetFields();
                          },
                        }}
                        options={valueTypeArray.map((value) => ({
                          label: value,
                          value,
                        }))}
                      />
                    </ProFormGroup>
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                      size={8}
                    >
                      <ProFormText width="xs" label="列提示" name="tooltip" />
                    </ProFormGroup>
                    <ProFormDependency name={['valueType', 'valueEnum']}>
                      {({ valueType, valueEnum }) => {
                        if (valueType !== 'select') {
                          return null;
                        }
                        return (
                          <ProFormTextArea
                            formItemProps={{
                              style: {
                                marginBlockStart: 8,
                              },
                            }}
                            fieldProps={{
                              value: JSON.stringify(valueEnum),
                            }}
                            normalize={(value: any) => {
                              return JSON.parse(value);
                            }}
                            label="数据枚举"
                            name="valueEnum"
                          />
                        );
                      }}
                    </ProFormDependency>
                  </ProFormList>
                ),
              },
            ],
          }}
        />
      </ProForm> */}
    </ProCard>
  );
};

export default DynamicSettings;