import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/route';
import { Button, Modal, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { RouteInfoForm } from './constants';
import { Route, deleteRouteApi, updateRouteApi } from '../../../apis/route';
import { useState } from 'react';
import RouteDetailList from './RouteDetailList';

export default (props: { record: Route }) => {
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
    const id = String(props.record.route_id)
    const result = await deleteRouteApi(id);
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

      <Button type="link" size='small' onClick={showModal}>
        查看详情
      </Button>
      <Modal title="路线详情" width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <RouteDetailList route={props.record} />
      </Modal>

      <CreateForm<Route>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <RouteInfoForm />
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