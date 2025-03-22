import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
// import { StationSurveillance, createStationSurveillanceApi, getAllStationApi } from '../../../apis/station';
import { StationSurveillanceForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
// TODO 搞一个common
import { incremented } from '../../../store/common';
import { CreateForm } from '../../../components/CreateForm';
import { StationSurveillance, getAllStationSurveillanceApi, createStationSurveillanceApi } from '../../../apis/station/stationSurveillance';
import { dateTime2iso } from '../../../utils/time';
// import { StationSurveillance, createStationSurveillanceApi, getAllStationSurveillanceApi } from '../../../apis/vehicle/vehicle';

export default function InfoTable() {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<StationSurveillance[]>(navigate, getAllStationSurveillanceApi, 'surveillance_id')

  const dispatch = useDispatch();
  const onSubmit = async (values: StationSurveillance) => {
    if (values.timestamp) {
      values.timestamp = dateTime2iso(values.timestamp)
    }
    const result = await createStationSurveillanceApi(values)
    if (result?.data) {
      message.success('创建成功')
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
          rowKey={'surveillance_id'}
          params={{ timestamp: refreshTable }}
          request={getData}
          toolBarRender={() => [
            <CreateForm<StationSurveillance>
              title="新增信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <StationSurveillanceForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
