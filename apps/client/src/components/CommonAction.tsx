import { useDispatch } from 'react-redux';
import { incremented } from '../store/common';
import { Button, Popconfirm, Space, message } from 'antd';
import { CreateForm } from './CreateForm';

// 定义组件生成函数的参数类型
interface CreateInfoActionComponentProps<EntityType> {
  entityName: string; // 实体名称（用于显示）
  idField: keyof EntityType; // 实体的 ID 字段名称
  updateApi: (id: string, info: EntityType) => Promise<{ statusCode: number }>; // 更新 API 函数
  deleteApi: (id: string) => Promise<void>; // 删除 API 函数
  FormComponent: React.ComponentType; // 表单组件
}

// 创建通用组件生成函数
function createInfoActionComponent<EntityType>({
  entityName,
  idField,
  updateApi,
  deleteApi,
  FormComponent,
}: CreateInfoActionComponentProps<EntityType>) {
  return function InfoAction(props: { record: EntityType }) {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const onSubmit = async (info: EntityType) => {
      const id = String(props.record[idField]);
      const result = await updateApi(id, info);
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
      const id = String(props.record[idField]);
      await deleteApi(id);
      dispatch(
        incremented({
          unit: 1,
        })
      );
      messageApi.success('删除成功');
    };

    return (
      <Space>
        {contextHolder}

        <CreateForm<EntityType>
          title={`修改${entityName}信息`}
          initForm={props.record}
          onSubmit={onSubmit}
          triggerRender={() => <Button type="link" size="small">修改</Button>}
        >
          <FormComponent />
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
  };
}

// 导出通用组件生成函数
export default createInfoActionComponent;