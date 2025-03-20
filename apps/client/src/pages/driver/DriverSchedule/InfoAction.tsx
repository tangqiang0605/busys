import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/route';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { FixedScheduleForm } from './constants';
// import { Route, deleteRouteApi, updateRouteApi } from '../../../apis/route';
import { FixedSchedule, deleteFixedScheduleApi, updateFixedScheduleApi } from '../../../apis/schedule/fixedSchedule';
// import DetailModal from './DetailModal';

export default function InfoAction(props: { record: FixedSchedule }) {
  const dispatch = useDispatch();
  const [messageTool, contextHolder] = message.useMessage();

  const onSubmit = async (values: FixedSchedule) => {
    // 表单数据提交后端前预处理
    const workdays = values.weekly_schedule.length
    if (workdays > 7) {
      message.error(`最多安排一周七天，不能安排${workdays}天`)
      return;
    }
    try {
      values.weekly_schedule = values.weekly_schedule.map(({ routeIds }) => {
        // TODO djr 前端检测输入的id是否重复
        if (Array.isArray(routeIds)) {
          return { routeIds }
        }
        return { routeIds: (routeIds as any as string).split(',').map(Number) }
      })
    } catch (err) {
      message.error('格式有误')
      console.error('routeIds格式有误', err)
      return;
    }
    const id = String(props.record.schedule_id)
    const result = await updateFixedScheduleApi(id, values);
    if (result.statusCode === 200) {
      dispatch(
        incremented({
          unit: 1
        })
      );
      messageTool.success('修改成功')
    } else {
      messageTool.error(`修改失败（${result.statusCode}）`)
    }
    return true;
  }

  const onConfirm = async () => {
    const id = String(props.record.schedule_id)
    await deleteFixedScheduleApi(id);
    // TODO djr 异常处理
    dispatch(
      incremented({
        unit: 1
      })
    );
    messageTool.success('删除成功');
  };


  return (
    <Space>
      {contextHolder}

      {/* <DetailModal route={props.record} /> */}

      <CreateForm<FixedSchedule>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <FixedScheduleForm />
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