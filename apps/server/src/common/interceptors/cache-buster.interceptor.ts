import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * 移除参数
 * @example @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp','random','r','_']))
 */
export function createCacheBusterInterceptor(paramsToRemove: string[]) {
  return new CacheBusterInterceptor(paramsToRemove);
}

@Injectable()
export class CacheBusterInterceptor implements NestInterceptor {
  private paramsToRemove: string[];

  constructor(paramsToRemove: string[]) {
    this.paramsToRemove = paramsToRemove;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // 删除指定的查询参数
    this.paramsToRemove.forEach((param) => {
      delete request.query[param];
    });

    return next.handle();
  }
}