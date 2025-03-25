
import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './layouts/Dashboard/index';
import Login from './pages/Login';
import { menuAndRouteData } from './routerConfig';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {menuAndRouteData.map((item) => (
          <Route key={item.path} path={`/${item.path}`} element={<Outlet />}>
            {item.routes?.map((subItem) => (
              <Route key={subItem.path} path={subItem.path} element={<subItem.component />} />
            ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
};

export default App;