import { DrawerForm } from '@ant-design/pro-components';

export function CreateForm<T>(props: {
  title: string,
  triggerRender: () => any,
  onSubmit: (formData: T) => Promise<boolean | void>,
  initForm: Partial<T>,
  children: React.ReactNode
}) {
  return (
    <DrawerForm<T>
      title={props.title}
      width={800}
      initialValues={props.initForm ?? {}}
      trigger={props.triggerRender()}
      autoFocusFirstInput
      drawerProps={{ destroyOnClose: true }}
      submitTimeout={2000}
      onFinish={props.onSubmit}
    >
      {props.children}
    </DrawerForm>
  );
};