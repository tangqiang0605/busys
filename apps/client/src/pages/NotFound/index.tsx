import React from 'react';
import { Result, Button, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './style.css'; // 可选：用于添加自定义样式

const { Title, Paragraph } = Typography;

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="link" href="/" >
            <HomeOutlined /> 返回首页
          </Button>
        }
      >
      </Result>
    </div>
  );
};

export default NotFoundPage;