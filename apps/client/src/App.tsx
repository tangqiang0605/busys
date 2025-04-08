
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Dashboard/index';
import Login from './pages/Login';
import { menuAndRouteData } from './routes/config';
import React, { useCallback, useEffect, useRef } from 'react';
import { useLocalStorageState } from 'ahooks';
import useMessage from 'antd/es/message/useMessage';
import { useSelector, useDispatch } from 'react-redux';
import { accessTokenKey, getUserInfoApi } from './apis/login';
import { RootState } from './store';
import { saveUser } from './store/user';
import { decodeJwt } from './utils/common';
import NotFoundPage from './pages/NotFound';

const App = () => {
  const [messageApi, messageContext] = useMessage();
  const location = useLocation();
  const navigate = useNavigate()
  const [accessToken] = useLocalStorageState<{ data: string }>(accessTokenKey)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const expr = useSelector((state: RootState) => state.user.expr)
  const dispatch = useDispatch();

  const canUserAccess = useCallback(async () => {
    // token是否存在
    if (!accessToken) {
      messageApi.warning('凭证不存在，请重新登录')
      navigate('/login')
      return;
    }
    // token是否过期
    const { exp } = decodeJwt(accessToken.data!);
    const now = Math.floor(Date.now() / 1000);
    if (exp < now) {
      messageApi.warning('存储凭证已过期，请重新登录')
      navigate('/login')
      return;
    }
    // 权限信息是否存在
    let validUserInfo = userInfo;
    if (!validUserInfo?.user_id) {
      console.log('qihangtang token兑换权限')
      const result = await getUserInfoApi()
      if (result.statusCode === 401) {
        navigate('/login')
      } else {
        dispatch(saveUser({ user: result.data, expr: expr! }))
        validUserInfo = result.data;
      }
    }
    // 目标路由是否可访问（url进入）
    if (location.pathname == '/') {
      navigate(validUserInfo?.role.allowed_routes[0] as string)
    } else if (validUserInfo?.role.allowed_routes.includes(location.pathname)) {
      // 允许
    } else {
      navigate('/404')
    }
  }, [dispatch, expr, navigate, messageApi, accessToken, location, userInfo])

  const oldPathname = useRef('')
  useEffect(() => {
    const publicPages = ['/login'];
    if (oldPathname.current !== location.pathname && !publicPages.includes(location.pathname)) {
      canUserAccess()
      oldPathname.current = location.pathname;
    }
  }, [location, canUserAccess, oldPathname.current])

  return (
    <div>
      {messageContext}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/404' element={<NotFoundPage />} />
        <Route path="/" element={<Layout />}>
          {menuAndRouteData.map((item) => (
            <Route key={item.path} path={`/${item.path}`} element={<Outlet />} >
              {item.routes?.map((subItem) => (
                <Route key={subItem.path} path={subItem.path} element={<subItem.component />} />
              ))}
            </Route>
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default App;