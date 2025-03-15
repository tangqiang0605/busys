import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) { }

  create(createStationDto: Prisma.StationCreateInput) {
    return this.prisma.station.create({ data: createStationDto });
  }

  findAll() {
    return this.prisma.station.findMany()
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