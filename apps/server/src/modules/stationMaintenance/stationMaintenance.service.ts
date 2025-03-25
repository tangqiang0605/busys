import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class StationMaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createStationMaintenanceDto: Prisma.StationMaintenanceCreateInput & {
      station_id: string;
      request_id: string;
      staff_id: string;
    },
  ) {
    const [stationExist, requestExist, employeeExist] = await Promise.all([
      this.prisma.station.findUnique({
        where: { station_id: +createStationMaintenanceDto.station_id },
      }),
      this.prisma.maintenanceRequest.findUnique({
        where: { request_id: +createStationMaintenanceDto.request_id },
      }),
      this.prisma.employee.findUnique({
        where: { employee_id: +createStationMaintenanceDto.staff_id },
      }),
    ]);
    if (!stationExist) throw new Error('车站id不存在');
    if (!requestExist) throw new Error('维护申请不存在');
    if (!employeeExist) throw new Error('职工不存在');
    return this.prisma.stationMaintenance.create({
      data: createStationMaintenanceDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'maintenance_id',
    ]);
    const data = await this.prisma.stationMaintenance.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.stationMaintenance.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.stationMaintenance.findUnique({
      where: { maintenance_id: id },
    });
  }

  update(
    id: number,
    updateStationMaintenanceDto: Prisma.StationMaintenanceUpdateInput,
  ) {
    return this.prisma.stationMaintenance.update({
      where: { maintenance_id: id },
      data: updateStationMaintenanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.stationMaintenance.delete({
      where: { maintenance_id: id },
    });
  }
}
