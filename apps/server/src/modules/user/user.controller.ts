import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Logger, Header, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { hashPassword } from './utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly logger: Logger) { }

  @Post('login')
  async login(@Body() loginInfo: { id: string, password: string }) {
    const user_id = Number(loginInfo.id);
    this.logger.debug(user_id, loginInfo.id, loginInfo)
    if (Number.isNaN(user_id)) {
      throw new HttpException('账号必须是纯数字', HttpStatus.OK)
    }

    const user = await this.userService.readUserById({ user_id: Number(loginInfo.id) })

    if (!user) {
      throw new HttpException(`账户${loginInfo.id}不存在`, HttpStatus.OK);
    }

    if (hashPassword(loginInfo.password) !== user.password_hash) {
      this.logger.debug(JSON.stringify({ message: '密码错误', details: [loginInfo.password, hashPassword(loginInfo.password), user.password_hash] }))
      throw new HttpException('密码错误', HttpStatus.OK)
    }

    try {
      // const role = this.userService.readRoleById({ role_id: Number(user.role_id) })
      this.logger.debug(JSON.stringify(user))
      const tokens = this.userService.generateTokens(user);

      return {
        user,
        // role,
        tokens
      }
    } catch (err) {
      throw new HttpException('生成token遇到错误', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



  @Post('create_role')
  async creatRole(@Body() createRoleDto: Prisma.RoleCreateInput) {
    try {
      const result = await this.userService.createRole(createRoleDto)
      return result;
    } catch (err) {
      throw new HttpException(err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('read_role')
  async readRole(@Body() whereRoleDto: Prisma.RoleWhereInput) {
    return this.userService.readRole(whereRoleDto)
  }

  @Post('create_user')
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    try {
      if ((createUserDto as any).role_id === undefined) {
        throw Error('参数校验不通过')
      }
      const result = await this.userService.createUser(createUserDto);
      return result
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('getinfo')
  async readUserInfoByToken(@Request() req) {
    this.logger.debug(req)
    const user_id = req['user'].user_id;
    const user = await this.userService.readUserWithRoleById({ user_id })
    user.password_hash = undefined;
    this.logger.debug(user)
    return user;
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne({ user_id: +id });
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
  //   return this.userService.update({ user_id: +id }, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove({ user_id: +id });
  // }
}
