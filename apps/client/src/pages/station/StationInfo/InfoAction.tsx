import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/station';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { Station, deleteStationApi, updateStationApi } from '../../../apis/station';
import { StationInfoForm } from './constants';

export default function InfoAction(props: { record: Station }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (info: Station) => {
    const id = String(props.record.station_id)
    const result = await updateStationApi(id, info);
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
    const id = String(props.record.station_id)
    await deleteStationApi(id);
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

      <CreateForm<Station>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <StationInfoForm />
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