import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 模拟登录逻辑
    navigate('/');
  };

  return (
    <div>
      <h1>登录页面</h1>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

export default Login;