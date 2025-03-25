import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../../../utils/factory';
// import { Facility, createFacilityApi, getAllStationApi } from '../../../apis/station';
import { FacilityForm } from './constants';
import { defaultForm, tableSettings } from './constants';
import { Button, message } from 'antd';
// TODO 搞一个common
import { incremented } from '../../../store/common';
import { CreateForm } from '../../../components/CreateForm';
import { Facility, createFacilityApi, getAllFacilityApi } from '../../../apis/facility/facilityInfo';
// import { Facility, createVehicleApi, getAllVehicleApi } from '../../../apis/vehicle/vehicle';

export default function InfoTable() {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<Facility[]>(navigate, getAllFacilityApi, 'facility_id')

  const dispatch = useDispatch();
  const onSubmit = async (values: Facility) => {
    const result = await createFacilityApi(values)
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
          rowKey={'facility_id'}
          params={{ timestamp: refreshTable, location: "station" }}
          request={getData}
          toolBarRender={() => [
            <CreateForm<Facility>
              title="新增信息"
              initForm={defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              <FacilityForm />
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
