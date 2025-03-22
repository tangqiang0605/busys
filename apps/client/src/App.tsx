
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Dashboard/index';
import Login from './pages/Login';
import DriverInfo from './pages/driver/DriverInfo';
import DriverSchedule from './pages/driver/DriverSchedule/index';
import DriverEvaluation from './pages/driver/DriverEvaluation';
import StationInfo from './pages/station/StationInfo';
import RouteInfo from './pages/route/RouteInfo';
import RouteSchedule from './pages/route/Schedule/index'
import DevTools from './pages/DevTools';
import VehicleInfo from './pages/vehicle/VehicleInfo';
import FacilityTypeInfo from './pages/facility/FacilityTypeInfo';
import FacilityInfo from './pages/facility/FacilityInfo';
import StationSurveillance from './pages/station/StationMonitor';

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
          <Route path="monitor" element={<StationSurveillance />} />
          {/* <Route path="maintenance" element={<StationMaintenance />} /> */}
        </Route>



        <Route path='route'>
          <Route path='info' element={<RouteInfo />} />
          <Route path='schedule' element={<RouteSchedule />} />
        </Route>

        <Route path="vehicle">
          <Route path="info" element={<VehicleInfo />} />
          {/* <Route path="schedule" element={<VehicleSchedule />} /> */}
          {/* <Route path="maintenance" element={<VehicleMaintenance />} /> */}
        </Route>

        <Route path='facility'>
          <Route path='facilityInfo' element={<FacilityInfo />}></Route>
          <Route path='facilityType' element={<FacilityTypeInfo />}></Route>
        </Route>

        <Route path='devtools' element={<DevTools />} />


      </Route>
    </Routes>
  );
};

export default App;