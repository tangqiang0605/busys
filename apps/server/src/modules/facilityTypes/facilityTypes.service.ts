import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class FacilityTypesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFacilityTypesDto: Prisma.FacilityTypesCreateInput) {
    return this.prisma.facilityTypes.create({ data: createFacilityTypesDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, ['type_id']);
    const data = await this.prisma.facilityTypes.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.facilityTypes.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.facilityTypes.findUnique({ where: { type_id: id } });
  }

  update(id: number, updateFacilityTypesDto: Prisma.FacilityTypesUpdateInput) {
    return this.prisma.facilityTypes.update({
      where: { type_id: id },
      data: updateFacilityTypesDto,
    });
  }

  remove(id: number) {
    return this.prisma.facilityTypes.delete({ where: { type_id: id } });
  }
}
