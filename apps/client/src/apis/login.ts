
export async function loginApi(params: { id: string, password: string }) {
  const result = await fetch('/api/token/login', {
    method: 'POST', headers: {
      "Content-Type": "application/json"
    }, body: JSON.stringify(params)
  })
  const body = await result.json()
  return body;
}

export const accessTokenKey = 'accessToken'
export async function tryLoginApi(params: { id: string, password: string }): Promise<string | { user_id: number, role: any }> {
  const result = await loginApi(params)
  // console.log(result)
  if (!result.data) {
    // TODO 登录失败
    return result.message;
  }

  // NOTE localStorage是以json字符串存储的
  localStorage.setItem(accessTokenKey, JSON.stringify({ data: result.data.tokens.accessToken }));
  return result.data.user;
}

/**
 * 根据token获取当前用户信息
 */
export async function getUserInfoApi() {
  const accessToken = JSON.parse(localStorage.getItem(accessTokenKey) || '').data;
  console.log(accessToken)
  const result = await fetch('/api/token/getinfo', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const response = await result.json();
  // .then(res => res.json())
  return response
}