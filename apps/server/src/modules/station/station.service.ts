import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) { }

  create(createStationDto: Prisma.StationCreateInput) {
    return this.prisma.station.create({ data: createStationDto });
  }

  async findAll(params: any) {
    const { pageNum = 1, pageSize = 10, ...restParams } = params;
    const skip = (Number(pageNum) - 1) * Number(pageSize);
    // 构建 where 条件

    const conditions = []
    for (const [key, value] of Object.entries(restParams)) {
      if (value !== undefined) {
        if (key === 'station_id') {
          // id，精确搜索
          conditions.push({ [key]: Number(value) })
          // where['station_id'] = Number(value)
        } else {
          // 模糊搜索
          // where[key] = value;
          conditions.push({ [key]: { contains: value } })
        }
      }
    }
    const where = { AND: conditions };

    // 获取分页数据
    const data = await this.prisma.station.findMany({
      skip,
      take: Number(pageSize),
      where
    });
    const total = await this.prisma.station.count({ where });

    // 返回分页结果和总数
    return {
      data,
      total,
      pageNum,
      pageSize,
    };
  }

  findOne(id: number) {
    return this.prisma.station.findUnique({ where: { station_id: id } })
  }

  update(id: number, updateStationDto: Prisma.StationUpdateInput) {
    return this.prisma.station.update({ where: { station_id: id }, data: updateStationDto })
  }

  remove(id: number) {
    return this.prisma.station.delete({ where: { station_id: id } })
  }
}