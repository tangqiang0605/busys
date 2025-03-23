import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'employee_id',
    ]);
    const data = await this.prisma.employee.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.employee.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({ where: { employee_id: id } });
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.prisma.employee.update({
      where: { employee_id: id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.prisma.employee.delete({ where: { employee_id: id } });
  }
}
