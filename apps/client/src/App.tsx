import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Dashboard/index';
import Login from './pages/Login';
import User from './pages/User';
import Store from './pages/Store';
import DriverInfo from './pages/driver/DriverInfo';
import DriverSchedule from './pages/driver/DriverSchedule';
import DriverEvaluation from './pages/driver/DriverEvaluation';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<User />} />
        <Route path="user" element={<User />} />
        <Route path="store" element={<Store />} />
        <Route path="driver">
          <Route path='info' element={<DriverInfo />} />
          <Route path='schedule' element={<DriverSchedule />} />
          <Route path='evaluation' element={<DriverEvaluation />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;