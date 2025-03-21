import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtMiddleware } from '../../common/middlewares/auth.middleware';
import { appModules } from './appModules';

@Module(appModules)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 路由鉴权
    consumer
      .apply(JwtMiddleware)
      .exclude(
        //   {
        //   path: '/user/read_role', method: RequestMethod.POST
        // },
        {
          path: '/user/login',
          method: RequestMethod.ALL,
        },
      )
      .forRoutes('*'); // 应用到所有路由，或者你可以指定特定的路由
  }
}
