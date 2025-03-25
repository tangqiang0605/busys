import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';
import { RequestType, MaintenanceType, ApprovalStatus } from './types';

@Injectable()
export class MaintenanceRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createMaintenanceRequestDto: Prisma.MaintenanceRequestCreateInput & {
      request_type: RequestType;
      maintenance_type: MaintenanceType;
      approval_status: ApprovalStatus;
    },
  ) {
    // TODO 参数校验，符合枚举的字符串值

    if (createMaintenanceRequestDto.request_type === RequestType.timer) {
      // 定时任务自动审批
      createMaintenanceRequestDto.approval_status = ApprovalStatus.allowed;
    }
    if (createMaintenanceRequestDto.request_type === RequestType.special) {
      createMaintenanceRequestDto.approval_status = ApprovalStatus.approval;
    }

    if (
      createMaintenanceRequestDto.maintenance_type === MaintenanceType.facility
    ) {
      const exist = await this.prisma.facilitie.findUnique({
        where: { facility_id: +createMaintenanceRequestDto.maintenance_id },
      });
      if (!exist) throw new Error('设施id不存在');
    }

    // 一般，定时任务维护的是车站，非定时任务维护的是车站设施，车辆同理
    if (
      createMaintenanceRequestDto.maintenance_type === MaintenanceType.station
    ) {
      const exist = await this.prisma.station.findUnique({
        where: { station_id: +createMaintenanceRequestDto.maintenance_id },
      });
      if (!exist) throw new Error('车站id不存在');
    }

    if (
      createMaintenanceRequestDto.maintenance_type === MaintenanceType.vehicle
    ) {
      const exist = await this.prisma.vehicle.findUnique({
        where: { vehicle_id: +createMaintenanceRequestDto.maintenance_id },
      });
      if (!exist) throw new Error('车辆id不存在');
    }

    return this.prisma.maintenanceRequest.create({
      data: createMaintenanceRequestDto,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'maintenanceRequest_id',
    ]);
    const data = await this.prisma.maintenanceRequest.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.maintenanceRequest.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  async findAll4StationFacility(params: any) {
    const facilities = await this.prisma.facilitie
      .findMany({
        where: {
          location: 'station', // 设施位置为 'station'
        },
        select: {
          facility_id: true, // 只选择 facility_id 字段
        },
      })
      .then((facilities) => facilities.map((f) => String(f.facility_id))); // 提取 facility_id 列表,
    const { skip, take, where, pageNum } = buildPageQuery(
      params,
      ['maintenanceRequest_id'],
      [
        {
          maintenance_type: 'facilities', // 维护类型为 'facilities'
          maintenance_id: {
            in: facilities,
          },
        },
      ],
    );
    // where;
    const data = await this.prisma.maintenanceRequest.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.maintenanceRequest.count({ where });

    return { data, total, pageNum, pageSize: take };
  }
  async findAll4VehicleFacility(params: any) {
    const facilities = await this.prisma.facilitie
      .findMany({
        where: {
          location: 'vehicle', // 设施位置为 'station'
        },
        select: {
          facility_id: true, // 只选择 facility_id 字段
        },
      })
      .then((facilities) => facilities.map((f) => String(f.facility_id))); // 提取 facility_id 列表,
    const { skip, take, where, pageNum } = buildPageQuery(
      params,
      ['maintenanceRequest_id'],
      [
        {
          maintenance_type: 'facilities', // 维护类型为 'facilities'
          maintenance_id: {
            in: facilities,
          },
        },
      ],
    );
    // where;
    const data = await this.prisma.maintenanceRequest.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.maintenanceRequest.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.maintenanceRequest.findUnique({
      where: { request_id: id },
    });
  }

  update(
    id: number,
    updateMaintenanceRequestDto: Prisma.MaintenanceRequestUpdateInput,
  ) {
    return this.prisma.maintenanceRequest.update({
      where: { request_id: id },
      data: updateMaintenanceRequestDto,
    });
  }

  remove(id: number) {
    return this.prisma.maintenanceRequest.delete({
      where: { request_id: id },
    });
  }
}
