import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from './utils';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async isLoginInfoValid(loginInfo: { id: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: Number(loginInfo.id),
      },
    });

    if (!user) {
      throw new Error(`账户${loginInfo.id}不存在`);
    }

    if (hashPassword(loginInfo.password) !== user.password_hash) {
      Logger.debug(
        JSON.stringify({
          message: '密码错误',
          details: [
            loginInfo.password,
            hashPassword(loginInfo.password),
            user.password_hash,
          ],
        }),
      );
      throw new Error('密码错误');
    }

    return user;
  }

  generateTokens(user: User) {
    const { user_id, username, metadata, is_active } = user;
    const payload = { user_id, username, metadata, is_active };

    Logger.debug(`环境变量jwt-secret${process.env.JWT_SECRET}`);

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d', // 短期有效
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d', // 长期有效
    });

    return { accessToken, refreshToken };
  }

  async readUserWithRoleById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { role: true },
    });
  }
}
