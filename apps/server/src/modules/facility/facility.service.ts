import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Facilitie, Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';
import { FacilityLocation } from './types';

@Injectable()
export class FacilityService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly stationService: StationService,
    // private readonly vehicleService: VehicleService,
  ) {}

  async create(createFacilityDto: Prisma.FacilitieCreateInput & Facilitie) {
    // 参数校验
    const exists = await this.prisma.facilityTypes.findUnique({
      where: { type_id: +createFacilityDto.facility_type_id },
    });
    if (!exists) throw new Error('设施类型id不存在');
    if (createFacilityDto.location === FacilityLocation.Station) {
      const exists = await this.prisma.station.findUnique({
        where: { station_id: +createFacilityDto.owner_id },
      });
      if (!exists) throw new Error('车站id不存在');
    }
    if (createFacilityDto.location === FacilityLocation.Vehicle) {
      const exists = await this.prisma.vehicle.findUnique({
        where: { vehicle_id: +createFacilityDto.owner_id },
      });
      if (!exists) throw new Error('车辆id不存在');
    }

    return this.prisma.facilitie.create({ data: createFacilityDto as any });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'facility_id',
    ]);
    const data = await this.prisma.facilitie.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.facilitie.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.facilitie.findUnique({ where: { facility_id: id } });
  }

  update(id: number, updateFacilityDto: Prisma.FacilitieUpdateInput) {
    // TODO djr 参数校验，参考 create 方法
    return this.prisma.facilitie.update({
      where: { facility_id: id },
      data: updateFacilityDto,
    });
  }

  remove(id: number) {
    return this.prisma.facilitie.delete({ where: { facility_id: id } });
  }
}
