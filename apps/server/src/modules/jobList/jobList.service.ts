import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class JobListService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJobListDto: Prisma.JobListCreateInput) {
    return this.prisma.jobList.create({ data: createJobListDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, ['job_id']);
    const data = await this.prisma.jobList.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.jobList.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.jobList.findUnique({ where: { job_id: id } });
  }

  update(id: number, updateJobListDto: Prisma.JobListUpdateInput) {
    return this.prisma.jobList.update({
      where: { job_id: id },
      data: updateJobListDto,
    });
  }

  remove(id: number) {
    return this.prisma.jobList.delete({ where: { job_id: id } });
  }
}
