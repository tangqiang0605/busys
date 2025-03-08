import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/middleware/prisma.service';
import { Prisma } from '@prisma/client';
function buildWhere(restParams: any, operator: 'AND' | 'OR' = 'AND') {
  const conditions = [];
  for (const [key, value] of Object.entries(restParams)) {
    if (value !== undefined) {
      // 如果字段是 employee 的字段，嵌套查询
      if (key.startsWith('employee.')) {
        const employeeField = key.split('.')[1]; // 提取 employee 的字段名
        conditions.push({
          employee: {
            [employeeField]: { contains: value },
          },
        });
      } else {
        // 否则，直接查询 DriverInfo 的字段
        conditions.push({ [key]: { contains: value } });
      }
    }
  }

  return operator === 'AND' ? { AND: conditions } : { OR: conditions };
}
@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService, private logger: Logger) { }

  // create(createDriverDto: CreateDriverDto) {
  //   return 'This action adds a new driver';
  // }

  async update(driver_id: number, data: any) {
    return this.prisma.driverInfo.update({
      where: { driver_id },
      data: {
        ...data.driverInfo,
        employee: {
          update: data.employee,
        },
      },
    });
  }

  async createDriver({
    driverInfo,
    employee,
  }: {
    driverInfo: Prisma.DriverInfoCreateInput;
    employee: Prisma.EmployeeCreateInput;
  }) {
    return this.prisma.driverInfo.create({
      data: {
        ...driverInfo,
        employee: {
          create: {
            ...employee
          }, // 直接在创建 DriverInfo 时嵌套创建 Employee
        },
      },
    });
  }

  async findAll(params: any, operator: 'AND' | 'OR' = 'AND') {
    const { pageNum, pageSize, ...restParams } = params;
    const skip = (Number(pageNum) - 1) * Number(pageSize);

    // 构建 where 条件
    const where = buildWhere(restParams, operator);

    // 获取分页数据
    const data = await this.prisma.driverInfo.findMany({
      skip,
      take: Number(pageSize),
      where,
      include: { employee: true },
    });
    const total = await this.prisma.driverInfo.count({ where });

    // 返回分页结果和总数
    return {
      data,
      total,
      pageNum,
      pageSize,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  // update(id: number, updateDriverDto: UpdateDriverDto) {
  //   return `This action updates a #${id} driver`;
  // }

  /**
   * 删除司机信息，不包括职员信息
   * @param id 
   * @returns 
   */
  removeDriverInfo(id: number) {
    return this.prisma.driverInfo.delete({ where: { driver_id: id } })
    // return `This action removes a #${id} driver`;
  }
}
