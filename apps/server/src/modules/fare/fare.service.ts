import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class FareService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFareDto: Prisma.FareCreateInput) {
    return this.prisma.fare.create({ data: createFareDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'fare_id',
    ]);
    const data = await this.prisma.fare.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.fare.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.fare.findUnique({ where: { fare_id: id } });
  }

  update(id: number, updateFareDto: Prisma.FareUpdateInput) {
    return this.prisma.fare.update({
      where: { fare_id: id },
      data: updateFareDto,
    });
  }

  remove(id: number) {
    return this.prisma.fare.delete({ where: { fare_id: id } });
  }
}
