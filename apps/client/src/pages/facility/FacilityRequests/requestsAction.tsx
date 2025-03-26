import { message, Space, Button, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { CreateForm } from "../../../components/CreateForm";
import { incremented } from "../../../store/common";
import { ApprovalStatus, FacilityRequests, approvalFacilityRequestApi, deleteFacilityRequestApi, rejectedFacilityRequestApi, updateFacilityRequestApi } from "../../../apis/facility/facilityRequests";
import { FacilityRequestsForm } from ".";

export function RequestsAction(props: { record: FacilityRequests }) {

  const entityName = '设施申请'

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (info: FacilityRequests) => {
    const id = String(props.record['request_id']);
    const result = await updateFacilityRequestApi(id, info);
    if (result.statusCode === 200) {
      dispatch(
        incremented({
          unit: 1,
        })
      );
      messageApi.success('修改成功');
    } else {
      messageApi.error(`修改失败（${result.statusCode}）`);
    }
    return true;
  };

  const onConfirm = async () => {
    const id = String(props.record['request_id']);
    await deleteFacilityRequestApi(id);
    dispatch(
      incremented({
        unit: 1,
      })
    );
    messageApi.success('删除成功');
  };
  // TODO 通过、拒绝。通过会产生一个新的设施，拒绝只是改变状态
  const onApproval = async () => {
    const id = String(props.record['request_id']);
    await approvalFacilityRequestApi(id);
    dispatch(
      incremented({
        unit: 1,
      })
    );
    messageApi.success('通过成功');
  };
  const onReject = async () => {
    const id = String(props.record['request_id']);
    await rejectedFacilityRequestApi(id);
    dispatch(
      incremented({
        unit: 1,
      })
    );
    messageApi.success('已拒绝');
  };

  return (
    <Space>
      {contextHolder}

      {props.record.approval_status === ApprovalStatus.approval && (<>
        <Popconfirm
          title={`通过${entityName}信息`}
          description="你确定通过此条记录？"
          onConfirm={onApproval}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" >
            通过
          </Button>
        </Popconfirm>

        <Popconfirm
          title={`拒绝${entityName}信息`}
          description="你确定拒绝此条记录？"
          onConfirm={onReject}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" size="small" danger>
            拒绝
          </Button>
        </Popconfirm></>)}

      <CreateForm<FacilityRequests>
        title={`修改${entityName}信息`}
        initForm={props.record}
        onSubmit={onSubmit}
        triggerRender={() => <Button type="link" size="small">修改</Button>}
      >
        <FacilityRequestsForm />
      </CreateForm>


      <Popconfirm
        title={`删除${entityName}信息`}
        description="你确定删除此条记录？"
        onConfirm={onConfirm}
        okText="确定"
        cancelText="取消"
      >
        <Button type="link" size="small" danger>
          删除
        </Button>
      </Popconfirm>


    </Space>
  );

}