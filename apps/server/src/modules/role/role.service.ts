import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) { }

  create(createRoleDto: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data: createRoleDto });
  }

  findAll() {
    return this.prisma.role.findMany()
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({ where: { role_id: id } })
  }

  update(id: number, updateRoleDto: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({ where: { role_id: id }, data: updateRoleDto })
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { role_id: id } })
  }
}