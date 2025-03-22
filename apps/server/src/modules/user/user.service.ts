import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';
import * as crypto from 'node:crypto';
// 哈希密码的函数（不带盐值）
export function hashPassword(password: string): string {
  const hash = crypto.createHash('sha256'); // 使用 SHA-256 哈希算法
  hash.update(password); // 更新哈希内容
  return hash.digest('hex'); // 返回十六进制字符串
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: Prisma.UserCreateInput & User & { new_password: string },
  ) {
    const exist = await this.prisma.role.findUnique({
      where: { role_id: +createUserDto.role_id },
    });
    if (!exist) throw new Error('role_id不存在');

    createUserDto.password_hash = hashPassword(createUserDto.new_password);
    delete createUserDto.new_password;
    return this.prisma.user.create({
      data: createUserDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, ['user_id']);
    const data = await this.prisma.user.findMany({
      skip,
      take,
      where,
      include: { role: true },
    });
    const total = await this.prisma.user.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { user_id: id },
      include: { role: true },
    });
  }

  update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput & { new_password: string },
  ) {
    updateUserDto.password_hash = hashPassword(
      updateUserDto.new_password as string,
    );
    delete updateUserDto.new_password;
    return this.prisma.user.update({
      where: { user_id: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { user_id: id } });
  }
}
