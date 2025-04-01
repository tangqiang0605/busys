import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CommonResponse {
  statusCode: number;
  message: string;
  data?: any;
  timestamp: string;
  path: string;
  stack?: any;
}

/**
 * @description 统一响应格式
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data): CommonResponse => {
        return {
          statusCode: response.statusCode ?? HttpStatus.OK,
          message: 'Success',
          data,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
      catchError((err) => {
        const statusCode =
          err.status ||
          err.response?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          err.message || err.response?.message || 'Internal Server Error';
        const stack = err.stack || err.response?.stack;
        return throwError(
          (): CommonResponse => ({
            statusCode,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            stack, // 包含错误堆栈信息
          }),
        );
      }),
    );
  }
}
