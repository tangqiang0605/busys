import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class BillsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBillsDto: Prisma.BillsCreateInput) {
    return this.prisma.bills.create({ data: createBillsDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, ['bill_id']);
    const data = await this.prisma.bills.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.bills.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.bills.findUnique({ where: { bill_id: id } });
  }

  update(id: number, updateBillsDto: Prisma.BillsUpdateInput) {
    return this.prisma.bills.update({
      where: { bill_id: id },
      data: updateBillsDto,
    });
  }

  remove(id: number) {
    return this.prisma.bills.delete({ where: { bill_id: id } });
  }
}
