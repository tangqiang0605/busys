import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../middleware/prisma.service';
import { User, Prisma, Role } from '@prisma/client';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto'
import { hashPassword } from './utils';

const secretKey = 'the secret key to decoded the password from frontend'

// 替换 bcrypt.hash
function hashPassword2(password, saltRounds = 10) {
  // 生成随机盐
  const salt = crypto.randomBytes(16).toString("hex");
  // 使用 PBKDF2 算法生成哈希
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 2 ** saltRounds, 64, "sha512").toString("hex");
  // 返回盐和哈希值的组合
  return `${salt}$${hashedPassword}`;
}

// 替换 bcrypt.compare
function comparePassword(decryptedPassword, storedHash) {
  // 分离盐和哈希值
  const [salt, hash] = storedHash.split("$");
  // 使用相同的盐重新计算哈希
  const newHash = crypto.pbkdf2Sync(decryptedPassword, salt, 2 ** 10, 64, "sha512").toString("hex");
  // 比较哈希值
  return newHash === hash;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private logger: Logger) { }

  generateTokens(user: User) {
    const { user_id, username, metadata, is_active } = user;
    const payload = { user_id, username, metadata, is_active };

    this.logger.debug(`环境变量jwt-secret${process.env.JWT_SECRET}`)
    // 生成access_token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      // TODO 该短一些测试
      expiresIn: '1d', // 短期有效
    });

    // 生成refresh_token
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d', // 长期有效
    });

    return { accessToken, refreshToken };
  }

  // TODO 让前端传过来的密码也是加密的
  // async validatePassword(encryptedPassword: string, storedHash: string): Promise<boolean> {
  //   // 解密密码
  //   const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  //   const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  //   // 比较哈希值
  //   return comparePassword(decryptedPassword, storedHash);
  // }

  // async hashPassword(password: string): Promise<string> {
  //   return hashPassword2(password, 10);
  // }

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    const result = await this.prisma.role.create({ data })
    return result
  }

  async readRole(data: Prisma.RoleWhereInput): Promise<Array<Role>> {
    return this.prisma.role.findMany({ where: data })
  }


  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    // const hashPassword()
    const password_hash = hashPassword(data.password_hash)
    return this.prisma.user.create({
      data: {
        ...data,
        password_hash
      }
    })
  }

  // async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }

  // async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
  //   return this.prisma.user.delete({
  //     where,
  //   });
  // }

  async readRoleById(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.findUnique({ where })
  }

  async readUserById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      // include: { role: true }
    });
  }

  // async findAll() {
  //   const user = await this.prisma.user.findMany()
  //   console.log(user)
  //   return user;
  // }

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }
}

