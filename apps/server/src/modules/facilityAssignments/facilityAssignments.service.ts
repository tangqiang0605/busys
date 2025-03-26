import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class FacilityAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFacilityAssignmentsDto: Prisma.FacilityAssignmentsCreateInput) {
    return this.prisma.facilityAssignments.create({
      data: createFacilityAssignmentsDto,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'assignment_id',
    ]);
    const data = await this.prisma.facilityAssignments.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.facilityAssignments.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.facilityAssignments.findUnique({
      where: { assignment_id: id },
    });
  }

  update(
    id: number,
    updateFacilityAssignmentsDto: Prisma.FacilityAssignmentsUpdateInput,
  ) {
    return this.prisma.facilityAssignments.update({
      where: { assignment_id: id },
      data: updateFacilityAssignmentsDto,
    });
  }

  remove(id: number) {
    return this.prisma.facilityAssignments.delete({
      where: { assignment_id: id },
    });
  }
}
