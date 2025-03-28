import React from 'react'
import { accessTokenKey } from '../../apis/login'
import { useLocalStorageState } from 'ahooks';
import { Button, Card, Col, Row, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function TokenInfo() {
  const [accessToken] = useLocalStorageState<{ data: string }>(accessTokenKey);
  return (
    <Card>

      <Row gutter={16} align="middle">
        <Col flex="auto">
          <TextArea value={JSON.stringify(accessToken)} readOnly rows={4} />
        </Col>
        <Col flex="none">
          <Button
            onClick={() => {
              const token = accessToken?.data;
              navigator.clipboard.writeText(token || '');
              message.success(`复制成功`);
            }}
          >
            复制 token
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default TokenInfo