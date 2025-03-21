import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
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
// import { FacilitieModule } from '../fa/facilitie.module';

export const appModules = {
  imports: [
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
