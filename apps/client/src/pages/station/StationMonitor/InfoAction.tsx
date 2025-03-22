import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/common';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { StationSurveillanceForm } from './constants';
import { StationSurveillance, deleteStationSurveillanceApi, updateStationSurveillanceApi } from '../../../apis/station/stationSurveillance';
import { dateTime2iso } from '../../../utils/time';
// import { StationSurveillance, deleteStationSurveillanceApi, updateStationSurveillanceApi } from '../../../apis/vehicle/vehicle';

export default function InfoAction(props: { record: StationSurveillance }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: StationSurveillance) => {
    if (values.timestamp) {
      console.log(values.timestamp, dateTime2iso(values.timestamp))
      values.timestamp = dateTime2iso(values.timestamp)
    }
    const id = String(props.record.surveillance_id)
    const result = await updateStationSurveillanceApi(id, values);
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
    const id = String(props.record.surveillance_id)
    await deleteStationSurveillanceApi(id);
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

      <CreateForm<StationSurveillance>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <StationSurveillanceForm />
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