import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { createDriverApi } from '../../../apis/driver';
import { DriverInfoFormData } from '../../../apis/types';

const params = {
  title: '添加司机',
  triggerButtonText: '添加司机'
}

type DriverForm = DriverInfoFormData

const defaultDriverForm = {
  "employee": {
    "name": "王五",
    "birth_date": "2025-03-06T14:06:54.947Z",
    "gender": "男",
    "address": "广东省",
    "phone_number": "13715788111",
    "id_type": "身份证",
    "id_number": "445121200004041111"
  },
  "driverInfo": {
    "license_type": "公交车驾驶证A1",
    "license_number": "4839438934",
    "license_expiry_date": "2027-03-06T14:06:54.947Z"
  }
}

export const CreateDriver = (props: {
  title: string,
  triggerRender: () => any,
  onSubmit: (formData: DriverInfoFormData) => Promise<boolean | void>,
  initForm?: typeof defaultDriverForm
}) => {

  return (
    <DrawerForm<DriverForm>
      title={props.title}
      width={800}
      initialValues={props.initForm ?? defaultDriverForm}
      trigger={
        props.triggerRender()
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={props.onSubmit}
    >
      {/* TODO 两列布局 */}
      <ProForm.Group title="职工信息" layout="horizontal">
        <ProFormText
          name={["employee", "name"]}
          width="md"
          label="姓名"
          // tooltip="最长为 24 位"
          placeholder="请输入姓名"
        />
        <ProFormDatePicker
          name={['employee', 'birth_date']
          }
          label="出生日期"
        />
        <ProFormRadio.Group
          // tooltip={`size="middle"`}
          // radioType="button"
          fieldProps={{
            size: 'small',
          }}
          label="性别"
          options={[
            {
              label: '男',
              value: '男',
            },
            {
              label: '女',
              value: '女',
            }
          ]}
          name={["employee", "gender"]}
        />
        <ProFormText
          rules={[{ required: true }]}
          width="md"
          name={["employee", "address"]}
          label="地址"
          placeholder="请输入"
        />
        <ProFormText
          name={["employee", "phone_number"]}
          label="手机号"
        />
        {/* TODO 表单field组件优化，增加枚举等 */}
        <ProFormSelect
          label="证件类型"
          name={['employee', 'id_type']}
          options={[
            {
              value: '身份证',
              label: '身份证',
            },
          ]}
          width="xs"
        />
        <ProFormText
          name={['employee', 'id_number']}
          label="证件号" />

      </ProForm.Group>
      <ProForm.Group title="司机信息">
        <ProFormText
          name={['driverInfo', 'license_type']}
          label="驾照类型"
        />
        <ProFormText
          name={['driverInfo', 'license_number']}
          label="驾照号码"
        />
        <ProFormText
          name={['driverInfo', 'license_expiry_date']}
          label="驾照有效至"
        />
      </ProForm.Group>
    </DrawerForm>
  );
};