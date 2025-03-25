import { AppController } from './app.controller';
import { AppService } from './app.service';
// import {  } from '../login/user.module';
import { PrismaModule } from '../../common/prisma/prisma.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../../common/interceptors/transformInterceptor';
import { DriverModule } from '../driver/driver.module';

import { EmployeeModule } from '../employee/employee.module';
import { RoleModule } from '../role/role.module';
import { DriverInfoModule } from '../driverInfo/driverInfo.module';
import { DriverScheduleModule } from '../driverSchedule/driverSchedule.module';
import { FixedScheduleModule } from '../fixedSchedule/fixedSchedule.module';
import { StationModule } from '../station/station.module';
import { RouteModule } from '../route/route.module';
import { RouteDetailModule } from '../routeDetail/routeDetail.module';
import { RouteScheduleModule } from '../routeSchedule/routeSchedule.module';
import { ExtraScheduleModule } from '../extraSchedule/extraSchedule.module';
import { Logger } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { KeepAliveService } from '../timer/KeepAliveSerivce';
import { VehicleModule } from '../vehicle/vehicle.module';
import { FacilityModule } from '../facility/facility.module';
import { FacilityTypesModule } from '../facilityTypes/facilityTypes.module';
import { StationSurveillanceModule } from '../stationSurveillance/stationSurveillance.module';
import { UserModule } from '../user/user.module';
import { LoginModule } from '../login/login.module';
import { JobListModule } from '../jobList/jobList.module';
import { EmployeePositionsModule } from '../employeePositions/employeePositions.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { PerformanceEvaluationsModule } from '../performanceEvaluations/performanceEvaluations.module';
import { MaintenanceRequestModule } from '../maintenanceRequest/maintenanceRequest.module';
import { BillsModule } from '../bills/bills.module';
import { StationMaintenanceModule } from '../stationMaintenance/stationMaintenance.module';
import { SafetySurveillanceModule } from '../safetySurveillance/safetySurveillance.module';
import { VehicleMaintenanceModule } from '../vehicleMaintenance/vehicleMaintenance.module';
import { VehicleOperationModule } from '../vehicleOperation/vehicleOperation.module';
import { FareModule } from '../fare/fare.module';
import { FareBillsModule } from '../fareBills/fareBills.module';
// import { FacilitieModule } from '../fa/facilitie.module';

export const appModules = {
  imports: [
    VehicleOperationModule,
    VehicleMaintenanceModule,
    SafetySurveillanceModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 使用环境变量存储密钥
      signOptions: { expiresIn: '1d' }, // access_token有效期
    }),
    PrismaModule,
    UserModule,
    DriverModule,
    EmployeeModule,
    RoleModule,
    DriverInfoModule,
    DriverScheduleModule,
    FixedScheduleModule,
    StationModule,
    RouteModule,
    RouteDetailModule,
    RouteScheduleModule,
    // ?FixedScheduleModule,
    ExtraScheduleModule,
    ScheduleModule.forRoot(),
    VehicleModule,
    // FacilitieModule,
    FacilityModule,
    FacilityTypesModule,
    StationSurveillanceModule,
    LoginModule,
    EmployeeModule,
    JobListModule,
    EmployeePositionsModule,
    AttendanceModule,
    PerformanceEvaluationsModule,
    MaintenanceRequestModule,
    BillsModule,
    StationMaintenanceModule,
    FareModule,
    FareBillsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    KeepAliveService,
    // CacheBusterInterceptor
  ],
};
