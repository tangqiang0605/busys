import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
import { RouteInfoForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
import { incremented } from '../../../store/route';
import { CreateForm } from '../../../components/CreateForm';
import { Route, createRouteApi, getAllRouteApi } from '../../../apis/route';

export default function InfoTable() {
  const refreshTable = useSelector((state: RootState) => state.route.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<Route[]>(navigate, getAllRouteApi)

  const dispatch = useDispatch();
  const onSubmit = async (values: Route) => {
    const result = await createRouteApi(values)
    if (result?.data) {
      message.success('创建成功啦')
      dispatch(
        incremented({
          unit: 1
        })
      );
    } else {
      message.error('创建失败')
      console.log('创建失败', result)
    }
    return true;
  }
  return (
    <ProCard
      split="vertical"
      bordered
      headerBordered
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProCard style={{ height: '100vh', overflow: 'auto' }}>
        <ProTable
          {...tableSettings}
          rowKey={'route_id'}
          rowSelection={{
            selectedRowKeys: selections,
            onChange(selectedRowKeys) {
              console.log(selectedRowKeys)
              setSelections(selectedRowKeys as number[])
            }
          }}
          params={{ timestamp: refreshTable }}
          request={getData}
          toolBarRender={() => [
            <CreateForm<Route>
              title="修改信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <RouteInfoForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
