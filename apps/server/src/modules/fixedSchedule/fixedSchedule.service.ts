import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FixedScheduleService {
  constructor(private readonly prisma: PrismaService) { }

  create(createFixedScheduleDto: Prisma.FixedScheduleCreateInput) {
    return this.prisma.fixedSchedule.create({ data: createFixedScheduleDto });
  }

  findAll() {
    return this.prisma.fixedSchedule.findMany()
  }

  findOne(id: number) {
    return this.prisma.fixedSchedule.findUnique({ where: { schedule_id: id } })
  }

  update(id: number, updateFixedScheduleDto: Prisma.FixedScheduleUpdateInput) {
    return this.prisma.fixedSchedule.update({ where: { schedule_id: id }, data: updateFixedScheduleDto })
  }

  remove(id: number) {
    return this.prisma.fixedSchedule.delete({ where: { schedule_id: id } })
  }
}