import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { EmployeePositions, Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class EmployeePositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeePositionsDto: Prisma.EmployeePositionsCreateInput &
      EmployeePositions,
  ) {
    const [employeeExist, jobExist] = await Promise.all([
      this.prisma.employee.findUnique({
        where: { employee_id: +createEmployeePositionsDto.employee_id },
      }),
      this.prisma.jobList.findUnique({
        where: { job_id: Number(createEmployeePositionsDto.job_id) },
      }),
    ]);
    if (!employeeExist) throw new Error('职工id不存在');
    if (!jobExist) throw new Error('岗位id不存在');
    return this.prisma.employeePositions.create({
      data: createEmployeePositionsDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'position_id',
    ]);
    const data = await this.prisma.employeePositions.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.employeePositions.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.employeePositions.findUnique({
      where: { position_id: id },
    });
  }

  update(
    id: number,
    updateEmployeePositionsDto: Prisma.EmployeePositionsUpdateInput,
  ) {
    return this.prisma.employeePositions.update({
      where: { position_id: id },
      data: updateEmployeePositionsDto,
    });
  }

  remove(id: number) {
    return this.prisma.employeePositions.delete({ where: { position_id: id } });
  }
}
