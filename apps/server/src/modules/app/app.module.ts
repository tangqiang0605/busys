import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../../common/prisma/prisma.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtMiddleware } from '../../common/middlewares/auth.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../../common/interceptors/transformInterceptor';
import { DriverModule } from '../driver/driver.module';
import { CacheBusterInterceptor } from '../../common/interceptors/cache-buster.interceptor';
import { EmployeeModule } from '../employee/employee.module';
import { RoleModule } from '../role/role.module';
import { DriverInfoModule } from '../driverInfo/driverInfo.module';
import { DriverScheduleModule } from '../driverSchedule/driverSchedule.module';
import { FixedScheduleModule } from '../fixedSchedule/fixedSchedule.module';
import { StationModule } from '../station/station.module';

@Module({
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
    StationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    // CacheBusterInterceptor
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        //   {
        //   path: '/user/read_role', method: RequestMethod.POST
        // },
        {
          path: '/user/login',
          method: RequestMethod.ALL
        }
      )
      .forRoutes('*'); // 应用到所有路由，或者你可以指定特定的路由
  }
}
