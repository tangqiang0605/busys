import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildWhere } from '../../common/utils';

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
