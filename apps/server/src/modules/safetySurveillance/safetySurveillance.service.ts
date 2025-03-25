import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, SafetySurveillance } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class SafetySurveillanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createSafetySurveillanceDto: Prisma.SafetySurveillanceCreateInput &
      SafetySurveillance,
  ) {
    if (createSafetySurveillanceDto.facility_id) {
      createSafetySurveillanceDto.facility_id = Number(
        createSafetySurveillanceDto.facility_id,
      );
    }
    return this.prisma.safetySurveillance.create({
      data: createSafetySurveillanceDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'record_id',
    ]);
    const data = await this.prisma.safetySurveillance.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.safetySurveillance.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.safetySurveillance.findUnique({
      where: { record_id: id },
    });
  }

  update(
    id: number,
    updateSafetySurveillanceDto: Prisma.SafetySurveillanceUpdateInput,
  ) {
    return this.prisma.safetySurveillance.update({
      where: { record_id: id },
      data: updateSafetySurveillanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.safetySurveillance.delete({ where: { record_id: id } });
  }
}
