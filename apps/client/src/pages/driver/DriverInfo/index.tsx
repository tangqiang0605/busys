import { LikeOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Button, Descriptions, Result, Input, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import { FormProvider, Field } from '@formily/react';
import { useRequest } from 'ahooks';
// import SearchForm from './SearchForm';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



function MySearch() {

  // const searchText


  return (<div>

    {/* <SearchForm /> */}
    <Input size="small" placeholder="small size" prefix={<SearchOutlined />} />

  </div>)
}



/**
 * 管理员看到的
 * @returns 
 */
function DriverInfo() {
  return (
    <div>

      <div>
        DriverInfo
        1. 司机基本信息表
        2. 司机排班
        3. 绩效评估

        0. 默认路由名
        1. content+extraContent，可以用来写模块介绍
        2. tabList（静态的？）
        3. extraContent
        4. extra右上角按钮，增删查改
        5. footer底部按钮，下一页
      </div>

      <PageContainer
        content={'查看和管理司机基本信息'}
        // tabList={[
        //   {
        //     tab: '基本信息',
        //     key: 'base',
        //   },
        //   {
        //     tab: '详细信息',
        //     key: 'info',
        //   },
        // ]}
        extra={[
          <MySearch />,
          <Button key="1" type="primary">
            新建
          </Button>,
        ]}
        footer={[
          <Button key="3">重置</Button>,
          <Button key="2" type="primary">
            提交
          </Button>,
        ]}
      >

        <Table<DataType> columns={columns} dataSource={data} />;

      </PageContainer>

    </div>
  )
}

export default DriverInfo