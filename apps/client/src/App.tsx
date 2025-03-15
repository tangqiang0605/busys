import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Dashboard/index';
import Login from './pages/Login';
import User from './pages/User';
import Store from './pages/Store';
import DriverInfo from './pages/driver/DriverInfo';
import DriverSchedule from './pages/driver/DriverSchedule/index';
import DriverEvaluation from './pages/driver/DriverEvaluation';
import StationInfo from './pages/station/StationInfo';
import RouteInfo from './pages/station/RouteInfo';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<User />} />
        <Route path="user" element={<User />} />
        <Route path="store" element={<Store />} /> */}
        <Route path="driver">
          <Route path='info' element={<DriverInfo />} />
          <Route path='schedule' element={<DriverSchedule />} />
          <Route path='evaluation' element={<DriverEvaluation />} />
        </Route>


        {/* 司机管理 */}
        <Route path="driver">
          <Route path="info" element={<DriverInfo />} />
          <Route path="schedule" element={<DriverSchedule />} />
          <Route path="evaluation" element={<DriverEvaluation />} />
        </Route>

        {/* 车站管理 */}
        <Route path="station">
          <Route path="info" element={<StationInfo />} />
          <Route path='route' element={<RouteInfo />} />
          {/* <Route path="monitor" element={<StationMonitor />} />
          <Route path="maintenance" element={<StationMaintenance />} /> */}
        </Route>


      </Route>
    </Routes>
  );
};

export default App;