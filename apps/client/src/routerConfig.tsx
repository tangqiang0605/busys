import { EnvironmentOutlined, UserOutlined, NodeIndexOutlined, CarOutlined, ShoppingOutlined, TeamOutlined, SmileOutlined } from '@ant-design/icons';
import DevTools from './pages/DevTools';
import DriverEvaluation from './pages/driver/DriverEvaluation';
import DriverInfo from './pages/driver/DriverInfo';
import DriverSchedule from './pages/driver/DriverSchedule';
import AttendanceInfo from './pages/employee/attendance';
import EmployeeInfo from './pages/employee/employeeInfo';
import EmployeePositionsInfo from './pages/employee/employeePositions';
import PerformanceEvaluationsInfo from './pages/employee/evaluation';
import JobList from './pages/employee/jobList';
import FacilityInfo from './pages/facility/FacilityInfo';
import FacilityTypeInfo from './pages/facility/FacilityTypeInfo';
import RouteInfo from './pages/route/RouteInfo';
import RouteSchedule from './pages/route/Schedule';
import StationFacilityInfo from './pages/station/StationFacility';
import StationInfo from './pages/station/StationInfo';
import StationSurveillance from './pages/station/StationMonitor';
import UserInfo from './pages/user/userInfo';
import VehicleInfo from './pages/vehicle/VehicleInfo';
import MaintenanceRequestInfo from './pages/station/StationMaintenanceRequest';
import BillsInfo from './pages/station/BillsInfo';
import StationMaintenanceInfo from './pages/station/StationMaintenance';
import VehicleFacilityInfo from './pages/vehicle/VehicleFacility';
import SafetySurveillanceInfo from './pages/vehicle/VehicleMonitor';
import VehicleMaintenanceRequestInfo from './pages/vehicle/VehicleMaintenanceRequest';
import VehicleMaintenanceInfo from './pages/vehicle/VehicleMaintenance';
import VehicleOperationInfo from './pages/vehicle/VehicleOperation';

export const menuAndRouteData = [
  {
    path: "station",
    name: "车站管理",
    icon: <EnvironmentOutlined />,
    routes: [
      { path: "info", name: "车站信息管理", component: StationInfo },
      { path: "facility", name: "车站设施管理", component: StationFacilityInfo },
      { path: "monitor", name: "车站监控系统", component: StationSurveillance },
      { path: "request", name: "车站维护申请", component: MaintenanceRequestInfo },
      { path: "maintenance", name: "车站维护情况", component: StationMaintenanceInfo },
      { path: "bills", name: "车站相关账单", component: BillsInfo },
      // { path: "maintenance", name: "车站维护管理", component: StationMaintenance },
    ],
  }, {
    path: "route",
    name: "路线管理",
    icon: <NodeIndexOutlined />,
    routes: [
      { path: "info", name: "路线信息管理", component: RouteInfo },
      { path: "schedule", name: "路线排班管理", component: RouteSchedule },
    ],
  },
  {
    path: "vehicle",
    name: "车辆管理",
    icon: <CarOutlined />,
    routes: [
      { path: "info", name: "车辆信息管理", component: VehicleInfo },
      { path: "operaiton", name: "车辆安排情况", component: VehicleOperationInfo },
      { path: 'facility', name: "车辆设施管理", component: VehicleFacilityInfo },
      { path: 'monitor', name: "车辆监控管理", component: SafetySurveillanceInfo },
      // { path: "request", name: "车辆维护申请", componet: BillsInfo },
      { path: "request", name: "车辆维护申请", component: VehicleMaintenanceRequestInfo },
      { path: "maintenance", name: "车辆维护情况", component: VehicleMaintenanceInfo },
      { path: "bills", name: "车辆相关账单", component: BillsInfo },
      // { path: "schedule", name: "车辆调度系统", component: VehicleSchedule },
      // { path: "maintenance", name: "车辆维护提醒", component: VehicleMaintenance },
    ],
  },
  {
    path: "driver",
    name: "司机管理",
    icon: <UserOutlined />,
    routes: [
      { path: "info", name: "司机信息管理", component: DriverInfo },
      { path: "schedule", name: "司机排班系统", component: DriverSchedule },
      { path: "evaluation", name: "司机绩效评估", component: DriverEvaluation },
    ],
  },


  {
    path: "facility",
    name: "设施管理",
    icon: <ShoppingOutlined />,
    routes: [
      { path: "info", name: "设施实例信息", component: FacilityInfo },
      { path: "type", name: "设施类型管理", component: FacilityTypeInfo },
    ],
  },
  {
    path: "staff",
    name: "职工管理",
    icon: <TeamOutlined />,
    routes: [
      { path: "info", name: "职工信息管理", component: EmployeeInfo },
      { path: "jobList", name: "岗位信息表", component: JobList },
      { path: "position", name: "任岗情况", component: EmployeePositionsInfo },
      { path: "attendance", name: "考勤管理", component: AttendanceInfo },
      { path: "evaluation", name: "绩效评估", component: PerformanceEvaluationsInfo },
    ],
  },
  {
    path: "user",
    name: "账号管理",
    icon: <TeamOutlined />,
    routes: [
      { path: "info", name: "账号信息管理", component: UserInfo },
    ],
  },
  {
    path: "devtools",
    name: "开发者工具",
    icon: <SmileOutlined />,
    routes: [
      { path: "token", name: "开发者工具", component: DevTools },
    ],
  },
];