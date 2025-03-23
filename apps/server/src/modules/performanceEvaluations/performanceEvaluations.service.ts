import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class PerformanceEvaluationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPerformanceEvaluationsDto: Prisma.PerformanceEvaluationsCreateInput & {
      employee_id: string;
    },
  ) {
    const exist = await this.prisma.employee.findUnique({
      where: { employee_id: +createPerformanceEvaluationsDto.employee_id },
    });
    if (!exist) throw new Error('职工id不存在');
    return this.prisma.performanceEvaluations.create({
      data: createPerformanceEvaluationsDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'evaluation_id',
    ]);
    const data = await this.prisma.performanceEvaluations.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.performanceEvaluations.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.performanceEvaluations.findUnique({
      where: { evaluation_id: id },
    });
  }

  update(
    id: number,
    updatePerformanceEvaluationsDto: Prisma.PerformanceEvaluationsUpdateInput,
  ) {
    return this.prisma.performanceEvaluations.update({
      where: { evaluation_id: id },
      data: updatePerformanceEvaluationsDto,
    });
  }

  remove(id: number) {
    return this.prisma.performanceEvaluations.delete({
      where: { evaluation_id: id },
    });
  }
}
