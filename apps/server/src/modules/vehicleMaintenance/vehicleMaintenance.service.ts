import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class VehicleMaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createVehicleMaintenanceDto: Prisma.VehicleMaintenanceCreateInput & {
      vehicle_id: number;
    },
  ) {
    if (createVehicleMaintenanceDto.vehicle_id) {
      createVehicleMaintenanceDto.vehicle_id = Number(
        createVehicleMaintenanceDto.vehicle_id,
      );
    }
    return this.prisma.vehicleMaintenance.create({
      data: createVehicleMaintenanceDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'maintenance_id',
    ]);
    const data = await this.prisma.vehicleMaintenance.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.vehicleMaintenance.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.vehicleMaintenance.findUnique({
      where: { maintenance_id: id },
    });
  }

  update(
    id: number,
    updateVehicleMaintenanceDto: Prisma.VehicleMaintenanceUpdateInput,
  ) {
    return this.prisma.vehicleMaintenance.update({
      where: { maintenance_id: id },
      data: updateVehicleMaintenanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.vehicleMaintenance.delete({
      where: { maintenance_id: id },
    });
  }
}
