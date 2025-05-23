import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
import { Station, createStationApi, getAllStationApi } from '../../../apis/station';
import { StationInfoForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
import { incremented } from '../../../store/driver';
import { CreateForm } from '../../../components/CreateForm';

export default function InfoTable() {
  const refreshTable = useSelector((state: RootState) => state.station.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<Station[]>(navigate, getAllStationApi, 'station_id')

  const dispatch = useDispatch();
  const onSubmit = async (values: Station) => {
    const result = await createStationApi(values)
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
          rowKey={'station_id'}
          params={{ timestamp: refreshTable }}
          request={getData}
          toolBarRender={() => [
            <CreateForm<Station>
              title="新增信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <StationInfoForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
