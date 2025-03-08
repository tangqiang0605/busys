// 从环境变量中读取 API 域名
const API_URL = import.meta.env.VITE_API_URL;

// 泛型化的请求函数
export const request = async <T, U = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: U
): Promise<T> => {
  const url = `/api${endpoint}`;
  const options: RequestInit = {
    method,
    credentials: 'include', // 如果需要携带 cookie
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('封装请求函数request报错', error);
    throw error;
  }
};