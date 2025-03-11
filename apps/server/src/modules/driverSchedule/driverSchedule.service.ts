import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DriverScheduleService {
  constructor(private readonly prisma: PrismaService) { }

  create(createDriverScheduleDto: Prisma.DriverScheduleCreateInput) {
    return this.prisma.driverSchedule.create({ data: createDriverScheduleDto });
  }

  findAll() {
    return this.prisma.driverSchedule.findMany()
  }

  findOne(id: number) {
    return this.prisma.driverSchedule.findUnique({ where: { schedule_id: id } })
  }

  update(id: number, updateDriverScheduleDto: Prisma.DriverScheduleUpdateInput) {
    return this.prisma.driverSchedule.update({ where: { schedule_id: id }, data: updateDriverScheduleDto })
  }

  remove(id: number) {
    return this.prisma.driverSchedule.delete({ where: { schedule_id: id } })
  }
}