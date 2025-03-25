import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class VehicleOperationService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVehicleOperationDto: Prisma.VehicleOperationCreateInput) {
    return this.prisma.vehicleOperation.create({
      data: createVehicleOperationDto,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'operation_id',
    ]);
    const data = await this.prisma.vehicleOperation.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.vehicleOperation.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.vehicleOperation.findUnique({
      where: { operation_id: id },
    });
  }

  update(
    id: number,
    updateVehicleOperationDto: Prisma.VehicleOperationUpdateInput,
  ) {
    return this.prisma.vehicleOperation.update({
      where: { operation_id: id },
      data: updateVehicleOperationDto,
    });
  }

  remove(id: number) {
    return this.prisma.vehicleOperation.delete({ where: { operation_id: id } });
  }
}
