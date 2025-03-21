import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVehicleDto: Prisma.VehicleCreateInput) {
    return this.prisma.vehicle.create({ data: createVehicleDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'vehicle_id',
    ]);
    const data = await this.prisma.vehicle.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.vehicle.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.vehicle.findUnique({ where: { vehicle_id: id } });
  }

  update(id: number, updateVehicleDto: Prisma.VehicleUpdateInput) {
    return this.prisma.vehicle.update({
      where: { vehicle_id: id },
      data: updateVehicleDto,
    });
  }

  remove(id: number) {
    return this.prisma.vehicle.delete({ where: { vehicle_id: id } });
  }
}
