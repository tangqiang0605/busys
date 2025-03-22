import React from 'react'
import { accessTokenKey } from '../../apis/login'
import { useLocalStorageState } from 'ahooks';
import { Button, message } from 'antd';

function TokenInfo() {
  const [accessToken] = useLocalStorageState<{ data: string }>(accessTokenKey);
  return (
    <div>
      <div>          {JSON.stringify(accessToken)}</div>
      <Button onClick={() => {

        const token = accessToken?.data;
        navigator.clipboard.writeText(token || '')
        message.success(`复制成功`)

      }}>copy</Button>
    </div>
  )
}

export default TokenInfo