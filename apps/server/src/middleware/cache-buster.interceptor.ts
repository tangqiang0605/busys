import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 移除参数
 * 参考 driver.controller（搜CacheBusterInterceptor）
 */
@Injectable()
export class CacheBusterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();

    // 删除查询参数 `timestamp`
    if (request.query['timestamp']) {
      delete request.query['timestamp'];
    }

    // 继续执行后续逻辑
    return next.handle();
  }
}