import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/route';
import { Button, Modal, Popconfirm, Space, message } from 'antd';
import { Route, RouteDetail, deleteRouteApi, deleteRouteDetailApi, updateRouteApi } from '../../../apis/route';
import { useState } from 'react';

export default (props: { record: RouteDetail }) => {
  const dispatch = useDispatch();
  const [messageTool, contextHolder] = message.useMessage();

  const onSubmit = async (info: Route) => {
    const id = String(props.record.route_id)
    const result = await updateRouteApi(id, info);
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
    const id = String(props.record.detail_id)
    const result = await deleteRouteDetailApi(id);
    dispatch(
      incremented({
        unit: 1
      })
    );
    messageTool.success('删除成功');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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