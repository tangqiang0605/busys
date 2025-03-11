import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) { }

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.prisma.employee.create({ data: createEmployeeDto });
  }

  findAll() {
    return this.prisma.employee.findMany()
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({ where: { employee_id: id } })
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.prisma.employee.update({
      where: { employee_id: id }, data: updateEmployeeDto
    })
  }

  remove(id: number) {
    return this.prisma.employee.delete({ where: { employee_id: id } })
  }
};