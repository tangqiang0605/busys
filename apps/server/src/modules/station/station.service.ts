import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, Station } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStationDto: Prisma.StationCreateInput) {
    return this.prisma.station.create({ data: createStationDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'station_id',
    ]);

    // 获取分页数据
    const data = await this.prisma.station.findMany({ skip, take, where });
    const total = await this.prisma.station.count({ where });

    // 返回分页结果和总数
    return {
      data,
      total,
      pageNum,
      pageSize: take,
    };
  }

  findOne(id: number) {
    return this.prisma.station.findUnique({ where: { station_id: id } });
  }

  update(id: number, updateStationDto: Prisma.StationUpdateInput) {
    return this.prisma.station.update({
      where: { station_id: id },
      data: updateStationDto,
    });
  }

  remove(id: number) {
    return this.prisma.station.delete({ where: { station_id: id } });
  }
}
