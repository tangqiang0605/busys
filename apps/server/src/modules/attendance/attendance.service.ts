import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAttendanceDto: Prisma.AttendanceCreateInput & { employee_id: number },
  ) {
    const exist = await this.prisma.employee.findUnique({
      where: { employee_id: createAttendanceDto.employee_id },
    });
    if (!exist) throw new Error('职工id不存在');
    const result = await this.prisma.attendance.create({
      data: createAttendanceDto as any,
    });
    return result;
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'attendance_id',
    ]);
    const data = await this.prisma.attendance.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.attendance.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.attendance.findUnique({ where: { attendance_id: id } });
  }

  update(id: number, updateAttendanceDto: Prisma.AttendanceUpdateInput) {
    return this.prisma.attendance.update({
      where: { attendance_id: id },
      data: updateAttendanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.attendance.delete({ where: { attendance_id: id } });
  }
}
