import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, StationSurveillance } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class StationSurveillanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createStationSurveillanceDto: Prisma.StationSurveillanceCreateInput &
      StationSurveillance,
  ) {
    const [facilityExist, stationExist] = await Promise.all([
      this.prisma.facilitie.findUnique({
        where: { facility_id: +createStationSurveillanceDto.facility_id },
      }),
      this.prisma.station.findUnique({
        where: { station_id: +createStationSurveillanceDto.station_id },
      }),
    ]);
    if (!facilityExist) {
      throw new Error(
        `设施 ID ${createStationSurveillanceDto.facility_id} 不存在`,
      );
    } else if (
      facilityExist.location !== 'station' ||
      facilityExist.owner_id !== String(createStationSurveillanceDto.station_id)
    ) {
      // 注意，创建时填写的车站id必须和设施所在车站id一致
      throw new Error(
        `车站id不一致${facilityExist.owner_id}!==${createStationSurveillanceDto.station_id}`,
      );
    }
    if (!stationExist) {
      throw new Error(
        `车站 ID ${createStationSurveillanceDto.station_id} 不存在`,
      );
    }
    return this.prisma.stationSurveillance.create({
      data: createStationSurveillanceDto as any,
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'surveillance_id',
    ]);
    const data = await this.prisma.stationSurveillance.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.stationSurveillance.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.stationSurveillance.findUnique({
      where: { surveillance_id: id },
    });
  }

  update(
    id: number,
    updateStationSurveillanceDto: Prisma.StationSurveillanceUpdateInput,
  ) {
    return this.prisma.stationSurveillance.update({
      where: { surveillance_id: id },
      data: updateStationSurveillanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.stationSurveillance.delete({
      where: { surveillance_id: id },
    });
  }
}
