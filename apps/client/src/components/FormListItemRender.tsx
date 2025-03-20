import { ProCard } from "@ant-design/pro-components";
import React from "react";

export function FormListItemRender({ listDom, action }: { listDom: React.ReactNode, action: React.ReactNode }) {
  return (
    <ProCard
      bordered
      style={{
        marginBlockEnd: 8,
        position: 'relative',
      }}
      bodyStyle={{
        padding: 8,
        paddingInlineEnd: 16,
        paddingBlockStart: 16,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -4,
          right: 2,
        }}
      >
        {action}
      </div>
      {listDom}
    </ProCard>
  );
}