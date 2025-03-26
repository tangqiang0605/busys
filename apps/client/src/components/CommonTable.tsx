import { ProCard, ProTable, } from '@ant-design/pro-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router';
import { getDataFnFactory } from '../utils/factory';
import { Button, message } from 'antd';
import { incremented } from '../store/common';
import { CreateForm } from './CreateForm';
import { CommonTalbeProps } from './types';

export default function CommonTable<T>(props: CommonTalbeProps<T>) {
  const refreshTable = useSelector((state: RootState) => state.common.refreshTable);
  const [selections, setSelections] = useState<number[]>()
  const navigate = useNavigate();
  const getData = getDataFnFactory<T[]>(navigate, props.getAllItemApi, props.keyName)

  const dispatch = useDispatch();
  const onSubmit = async (values: T) => {
    const result = await props.createItemApi!(props.createItemValue ? props.createItemValue(values) : values)
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
          params={{ timestamp: refreshTable }}
          {...props.tableSettings}
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
          rowKey={props.keyName}
          request={getData}
          toolBarRender={() => [
            props.CreateFormItem && <CreateForm<T>
              title="新增信息"
              initForm={props.defaultForm}
              onSubmit={onSubmit}
              triggerRender={() => {
                return <Button type="primary">新增</Button>
              }} >
              {props.CreateFormItem}
            </CreateForm>
          ]}
        />
      </ProCard>
    </ProCard>
  );
};
