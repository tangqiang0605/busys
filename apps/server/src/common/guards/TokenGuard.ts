import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { NO_TOKEN_REQUIRED } from '../decorators/NoTokenRequired';
import { JWTPayload } from 'src/modules/login/types';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const noTokenRequired = Reflect.getMetadata(NO_TOKEN_REQUIRED, handler);
    if (noTokenRequired) {
      return true; // 如果路由不需要令牌，则直接通过
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as JWTPayload;
      request['user'] = payload; // 将解码后的用户信息附加到请求对象上
      return true;
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException('JWT token is invalid or has expired');
    }
  }
}
