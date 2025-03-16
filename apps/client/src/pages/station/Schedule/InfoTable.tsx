import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
import { RouteScheduleForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
import { CreateForm } from '../../../components/CreateForm';
import { RouteSchedule, createRouteScheduleApi, getAllRouteScheduleApi } from '../../../apis/route/routeSchedule';
import { hms2iso, iso2hhmm } from '../../../utils/time';



export default () => {
  const refreshTable = useSelector((state: RootState) => state.route.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<RouteSchedule[]>(navigate, getAllRouteScheduleApi)

  const dispatch = useDispatch();
  const onSubmit = async (values: RouteSchedule) => {
    console.log(values)
    // const result = await createRouteScheduleApi(values)
    // if (result?.data) {
    //   message.success('创建成功')
    //   dispatch(
    //     incremented({
    //       unit: 1
    //     })
    //   );
    // } else {
    //   message.error('创建失败')
    //   console.log('创建失败', result)
    // }
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
          rowSelection={{
            selectedRowKeys: selections,
            onChange(selectedRowKeys) {
              if (selectedRowKeys.length > 1) {
                setSelections([(selectedRowKeys as number[]).at(-1)!])
              } else {
                setSelections(selectedRowKeys as number[])
              }
            }
          }}
          rowKey={'schedule_id'}
          params={{ timestamp: refreshTable }}
          request={async (params, sort, filter) => {
            const data = await getData(params, sort, filter)
            data.data = data.data?.map((item) => {
              const { start_time, end_time } = item;

              return {
                ...item,
                start_time: iso2hhmm(start_time),
                end_time: iso2hhmm(end_time)
              }
            })
            return data;

          }}
          toolBarRender={() => [
            <CreateForm<RouteSchedule>
              title="修改信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <RouteScheduleForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
