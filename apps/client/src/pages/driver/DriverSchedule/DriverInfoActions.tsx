import { useDispatch } from 'react-redux'
import { DriverInfoTableData } from '../../../apis/types';
import { deleteDriverApi, updateDriverInfoApi } from '../../../apis/driver';
import driver, { incremented } from '../../../store/driver';
import { Button, Popconfirm, PopconfirmProps, Space, message } from 'antd';
import { CreateDriver } from './DriverInfoForm';


export const DriverInfoActions = (props: { record: DriverInfoTableData }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const confirm = async (record: DriverInfoTableData) => {
    console.log('要删除的司机', record.driver_id);

    const result = await deleteDriverApi(record.driver_id)
    dispatch(
      incremented({
        unit: 1
      })
    );
    messageApi.success('Click on Yes', result);
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    messageApi.error('Click on Nodafd');
  };

  const { employee, ...driverInfo } = props.record;

  return (
    // record就是这一行数据
    <Space>
      {contextHolder}
      <CreateDriver title="修改司机信息" initForm={{ employee, driverInfo }} onSubmit={async (info) => {
        // console.log('提交信息', info, driverInfo.driver_id)
        const result = await updateDriverInfoApi(driverInfo.driver_id, info);
        if (result.statusCode === 200) {
          dispatch(
            incremented({
              unit: 1
            })
          );
          messageApi.success('修改成功')
        } else {
          messageApi.error(`修改失败（${result.statusCode}）`)
        }
        return true;
      }} triggerRender={() => {

        return <Button type='link' size='small'>修改</Button>
      }} />
      <Popconfirm
        title="删除司机"
        description="你确定删除此条记录？"
        onConfirm={() => { confirm(props.record) }}
        onCancel={cancel}
        okText="确定"
        cancelText="取消"
      >
        <Button type='link' size='small' danger>删除</Button>
      </Popconfirm>
    </Space>)
}