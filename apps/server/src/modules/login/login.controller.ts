import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { NoTokenRequired } from 'src/common/decorators/NoTokenRequired';

@Controller('token')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @NoTokenRequired()
  async login(@Body() loginInfo: { id: string; password: string }) {
    const user_id = Number(loginInfo.id);
    if (Number.isNaN(user_id)) {
      throw new HttpException('账号必须是纯数字', HttpStatus.BAD_REQUEST);
    }

    let user;
    try {
      user = await this.loginService.isLoginInfoValid(loginInfo);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    try {
      const tokens = this.loginService.generateTokens(user);
      return {
        user,
        // role,
        tokens,
      };
    } catch (_) {
      throw new HttpException(
        '生成token遇到错误',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getinfo')
  async readUserInfoByToken(@Request() req) {
    const user_id = req['user'].user_id;
    const user = await this.loginService.readUserWithRoleById({ user_id });
    user.password_hash = undefined;
    return user;
  }
}
