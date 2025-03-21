import { useDispatch } from 'react-redux'
import { incremented } from '../../../store/common';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { FacilityTypesForm } from './constants';
import { FacilityTypes, deleteFacilityTypesApi, updateFacilityTypesApi } from '../../../apis/facility/facilityType';
// import { FacilityTypes, deleteFacilityTypesApi, updateFacilityTypesApi } from '../../../apis/vehicle/vehicle';

export default function InfoAction(props: { record: FacilityTypes }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (info: FacilityTypes) => {
    const id = String(props.record.type_id)
    const result = await updateFacilityTypesApi(id, info);
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
    const id = String(props.record.type_id)
    await deleteFacilityTypesApi(id);
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

      <CreateForm<FacilityTypes>
        title="修改信息"
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => { return <Button type='link' size='small'>修改</Button> }} >
        <FacilityTypesForm />
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