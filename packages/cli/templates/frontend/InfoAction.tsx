import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/common';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { VehicleForm } from './constants';
import { Vehicle, deleteVehicleApi, updateVehicleApi } from '../../../apis/vehicle/vehicle';

export default function InfoAction(props: { record: Vehicle }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (info: Vehicle) => {
    const id = String(props.record.vehicle_id)
    const result = await updateVehicleApi(id, info);
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
  }

  const onConfirm = async () => {
    const id = String(props.record.vehicle_id)
    await deleteVehicleApi(id);
    // TODO 请求结果异常处理
    dispatch(
      incremented({
        unit: 1
      })
    );
    messageApi.success('删除成功');
  };

  return (
    <Space>
      {contextHolder}

      <CreateForm<Vehicle>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <VehicleForm />
      </CreateForm>

      <Popconfirm
        title="删除信息"
        description="你确定删除此条记录？"
        onConfirm={onConfirm}
        okText="确定"
        cancelText="取消"
      >
        <Button type='link' size='small' danger>删除</Button>
      </Popconfirm>
    </Space>)
}