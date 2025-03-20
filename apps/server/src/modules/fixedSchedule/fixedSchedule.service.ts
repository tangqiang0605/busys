import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RouteService } from '../route/route.service';
import { buildPageQuery } from '../../common/utils';

@Injectable()
export class FixedScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly routeService: RouteService,
  ) {}

  async create(createFixedScheduleDto: Prisma.FixedScheduleCreateInput) {
    const { weekly_schedule } = createFixedScheduleDto;
    // TODO djr 校验是否最多只有七个（一周只有七天）
    // 检查传递过来的班次是否存在
    let data: any[];
    if (Array.isArray(weekly_schedule)) {
      data = weekly_schedule;
    } else {
      data = JSON.parse(weekly_schedule as string) as any[];
    }
    const routeIds = [];
    data.forEach((item) => {
      routeIds.push(...item.routeIds);
    });

    let isRouteIdsExist = true;
    const routeIdsSet = new Set(routeIds);
    for (const value of routeIdsSet) {
      // 如果不存在，设置为false
      const result = await this.routeService.findOne(Number(value));
      if (!result) isRouteIdsExist = false;
    }

    if (!isRouteIdsExist) {
      Logger.debug(routeIds);
      throw new Error('route id 不存在');
    }
    // TODO djr 如果route_id重复，需要去重再存入数据库
    return this.prisma.fixedSchedule.create({ data: createFixedScheduleDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'schedule_id',
      // 'route_id',
    ]);
    const data = await this.prisma.fixedSchedule.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.fixedSchedule.count({ where });

    return { data, total, pageNum, pageSize: take };

    // return this.prisma.fixedSchedule.findMany();
  }

  findOne(id: number) {
    return this.prisma.fixedSchedule.findUnique({ where: { schedule_id: id } });
  }

  update(id: number, updateFixedScheduleDto: Prisma.FixedScheduleUpdateInput) {
    return this.prisma.fixedSchedule.update({
      where: { schedule_id: id },
      data: updateFixedScheduleDto,
    });
  }

  remove(id: number) {
    return this.prisma.fixedSchedule.delete({ where: { schedule_id: id } });
  }
}
