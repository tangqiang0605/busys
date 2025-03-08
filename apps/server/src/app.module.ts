import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './middleware/prisma.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './middleware/transformInterceptor';
import { DriverModule } from './driver/driver.module';
import { CacheBusterInterceptor } from './middleware/cache-buster.interceptor';
// TODO app可以收到一个文件夹里面
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 使用环境变量存储密钥
      signOptions: { expiresIn: '1d' }, // access_token有效期
    }),
    PrismaModule,
    UserModule,
    DriverModule],
  controllers: [AppController],
  providers: [AppService, Logger, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }, CacheBusterInterceptor],
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
