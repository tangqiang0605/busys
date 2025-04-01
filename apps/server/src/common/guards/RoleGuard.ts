import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { NO_TOKEN_REQUIRED } from '../decorators/NoTokenRequired';
import { PrismaService } from '../prisma/prisma.service';
import { JWTPayload } from 'src/modules/login/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const noTokenRequired = Reflect.getMetadata(NO_TOKEN_REQUIRED, handler);
    if (noTokenRequired) {
      return true; // 如果路由不需要令牌，则直接通过
    }

    const user = request['user'] as JWTPayload;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userId = user.user_id;
    const userWithRole = await this.prisma.user.findUnique({
      where: { user_id: userId },
      include: { role: true },
    });
    const { allowed_interfaces } = userWithRole.role;

    // if (allowed_interfaces && Array.isArray(allowed_interfaces)) {
    //   const allowedPath = allowed_interfaces.map(
    //     (item: { path: string }) => item.path,
    //   );
    //   const { path, method } = context.switchToHttp().getRequest();
    //   return allowedPath.includes(path);
    // }

    return true;
  }
}
