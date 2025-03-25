import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Bills, FareBills, Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class FareBillsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createFareBillsDto: Prisma.FareBillsCreateInput & FareBills & Bills,
  ) {
    //  await prisma.fareBills.create({
    //     data: {
    //       fare_type: '普通票价',
    //       vehicle_id: 1, // 假设车辆 ID 为 1
    //       route_id: 1,   // 假设路线 ID 为 1
    //       bill: {
    //         create: { // 创建关联的 Bills 实体
    //           bill_type: '车费',
    //           amount: 2.5,
    //           description: '车费账单描述'
    //         }
    //       }
    //     }
    //   });

    const { fare_type, vehicle_id, route_id, ...bill } = createFareBillsDto;
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        vehicle_id: vehicle_id,
      },
    });
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${vehicle_id} not found`);
    }
    // 嵌套创建，创建车费的同时创建账单
    return this.prisma.fareBills.create({
      data: {
        fare_type,
        bill: { create: bill },
        vehicle: { connect: { vehicle_id } },
        route: { connect: { route_id } },
      } as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'fare_bill_id',
    ]);
    const data = await this.prisma.fareBills.findMany({
      skip,
      take,
      where,
      include: {
        bill: true, // 加载关联的 Bills 实体
      },
    });
    const total = await this.prisma.fareBills.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.fareBills.findUnique({ where: { fare_bill_id: id } });
  }

  update(
    id: number,
    updateFareBillsDto: Prisma.FareBillsUpdateInput & Bills & FareBills,
  ) {
    const { fare_type, vehicle_id, route_id, ...bill } = updateFareBillsDto;
    return this.prisma.fareBills.update({
      where: { fare_bill_id: id },
      data: {
        fare_type,
        vehicle: { connect: { vehicle_id: +vehicle_id } },
        route: { connect: { route_id: Number(route_id) } },
        bill: {
          update: bill,
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.fareBills.delete({ where: { fare_bill_id: id } });
  }
}
