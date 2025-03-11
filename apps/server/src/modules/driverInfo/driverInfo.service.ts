import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverInfoService {
  constructor(private readonly prisma: PrismaService) { }

  create(createDriverInfoDto: Prisma.DriverInfoCreateInput) {
    return this.prisma.driverInfo.create({ data: createDriverInfoDto });
  }

  findAll() {
    return this.prisma.driverInfo.findMany()
  }

  findOne(id: number) {
    return this.prisma.driverInfo.findUnique({ where: { driver_id: id } })
  }

  update(id: number, updateDriverInfoDto: Prisma.DriverInfoUpdateInput) {
    return this.prisma.driverInfo.update({ where: { driver_id: id }, data: updateDriverInfoDto })
  }

  remove(id: number) {
    return this.prisma.driverInfo.delete({ where: { driver_id: id } })
  }
}