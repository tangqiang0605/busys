import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/route';
import { Button, Popconfirm, Space, message } from 'antd';
import { RouteDetail, deleteRouteDetailApi } from '../../../apis/route';

export default function DetailAction(props: { record: RouteDetail }) {
  const dispatch = useDispatch();
  const [messageTool, contextHolder] = message.useMessage();

  // const onSubmit = async (info: Route) => {
  //   const id = String(props.record.route_id)
  //   const result = await updateRouteApi(id, info);
  //   if (result.statusCode === 200) {
  //     dispatch(
  //       incremented({
  //         unit: 1
  //       })
  //     );
  //     messageTool.success('修改成功')
  //   } else {
  //     messageTool.error(`修改失败（${result.statusCode}）`)
  //   }
  //   return true;
  // }

  const onConfirm = async () => {
    const id = String(props.record.detail_id)
    await deleteRouteDetailApi(id);
    // TODO 请求处理
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