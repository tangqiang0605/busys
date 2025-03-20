import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
import { FixedScheduleForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
import { incremented } from '../../../store/route';
import { CreateForm } from '../../../components/CreateForm';
// import { Route, createRouteApi, getAllRouteApi } from '../../../apis/route';
import { FixedSchedule, createFixedScheduleApi, getAllFixedScheduleApi } from '../../../apis/schedule/fixedSchedule';

export default function InfoTable() {
  const refreshTable = useSelector((state: RootState) => state.route.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<FixedSchedule[]>(navigate, getAllFixedScheduleApi)

  const dispatch = useDispatch();
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
    const result = await createFixedScheduleApi(values)
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
          request={async (...a) => {
            const b = await getData(...a);
            console.log(b);
            return b;
          }}
          toolBarRender={() => [
            <CreateForm<FixedSchedule>
              title="新增信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <FixedScheduleForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
