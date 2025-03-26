import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoleDto: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data: createRoleDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'role_id',
    ]);
    const data = await this.prisma.role.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.role.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({ where: { role_id: id } });
  }

  update(id: number, updateRoleDto: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({
      where: { role_id: id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { role_id: id } });
  }
}
