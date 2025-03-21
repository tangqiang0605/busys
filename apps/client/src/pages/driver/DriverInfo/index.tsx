
import {
  PageContainer,
} from '@ant-design/pro-components';

import DriverTable from './DriverInfoTable';



/**
 * 管理员看到的
 * @returns 
 */
function DriverInfo() {
  return (
    <div>

      {/* <div>
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
      </div> */}

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
      // extra={[
      //   <MySearch />,
      //   <Button key="1" type="primary">
      //     新建
      //   </Button>,
      // ]}
      // footer={[
      //   <Button key="3">重置</Button>,
      //   <Button key="2" type="primary">
      //     提交
      //   </Button>,
      // ]}
      >
        {/* <CreateDriver title='a' triggerButtonText='a' /> */}
        {/* <Table<DataType> columns={columns} dataSource={data} />; */}
        <DriverTable />
      </PageContainer>

    </div>
  )
}

export default DriverInfo