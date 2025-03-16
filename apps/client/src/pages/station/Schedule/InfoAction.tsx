import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/route';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { RouteScheduleForm } from './constants';
import { RouteSchedule, deleteRouteScheduleApi, updateRouteScheduleApi } from '../../../apis/route/routeSchedule';
import { hms2iso } from '../../../utils/time';

export default (props: { record: RouteSchedule }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (info: RouteSchedule) => {
    console.log(info, props.record)

    const id = String(props.record.schedule_id)
    const result = await updateRouteScheduleApi(id, {
      ...info,
      start_time: hms2iso(info.start_time),
      end_time: hms2iso(info.end_time)
    });
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
    const id = String(props.record.schedule_id)
    const result = await deleteRouteScheduleApi(id);
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

      <CreateForm<RouteSchedule>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <RouteScheduleForm />
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