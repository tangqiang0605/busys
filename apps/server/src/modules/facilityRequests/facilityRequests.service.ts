import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';
import { ApprovalStatus } from '../maintenanceRequest/types';

@Injectable()
export class FacilityRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFacilityRequestsDto: Prisma.FacilityRequestsCreateInput) {
    return this.prisma.facilityRequests.create({
      data: createFacilityRequestsDto,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'request_id',
    ]);
    const data = await this.prisma.facilityRequests.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.facilityRequests.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.facilityRequests.findUnique({
      where: { request_id: id },
    });
  }

  update(
    id: number,
    updateFacilityRequestsDto: Prisma.FacilityRequestsUpdateInput,
  ) {
    return this.prisma.facilityRequests.update({
      where: { request_id: id },
      data: updateFacilityRequestsDto,
    });
  }

  remove(id: number) {
    return this.prisma.facilityRequests.delete({ where: { request_id: id } });
  }

  async approval(params: { id: string; isPass: boolean }) {
    // TODO djr 如果状态不是审批中，就不能再审批了
    if (params.isPass) {
      const facilityRequest = await this.prisma.facilityRequests.findUnique({
        where: {
          request_id: +params.id,
        },
      });
      const reuslt = await this.prisma.$transaction(async (tx) => {
        const addFacility = await tx.facilitie.create({
          data: {
            facility_type_id: facilityRequest.facility_type_id,
            description: facilityRequest.request_reason,
            location: facilityRequest.owner_type,
            owner_id: facilityRequest.owner_id,
          },
        });
        const facilityAssignment = await tx.facilityAssignments.create({
          data: {
            request_id: +params.id,
            facility_id: addFacility.facility_id,
            assignment_date: new Date().toISOString(),
          },
        });
        const updated = await tx.facilityRequests.update({
          where: { request_id: +params.id },
          data: { approval_status: ApprovalStatus.allowed },
        });
        return {
          facilityRequest,
          addFacility,
          facilityAssignment,
          updated,
        };
      });
      return reuslt;
    } else {
      // const updated = await this.update(+params.id, {
      //   approval_status: ApprovalStatus.rejected,
      // });
      Logger.debug(params);
      const updated = await this.prisma.facilityRequests.update({
        where: { request_id: +params.id },
        data: {
          approval_status: ApprovalStatus.rejected,
        },
      });
      return { updated };
    }
  }
}
