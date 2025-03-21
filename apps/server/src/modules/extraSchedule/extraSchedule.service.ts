import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RouteService } from '../route/route.service';
import { buildPageQuery } from '../../common/utils';

@Injectable()
export class ExtraScheduleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly routeService: RouteService,
  ) {}

  async create(createExtraScheduleDto: Prisma.ExtraScheduleCreateInput) {
    const { special_schedule } = createExtraScheduleDto;
    // 检查传递过来的班次是否存在
    let data: any[];
    if (Array.isArray(special_schedule)) {
      data = special_schedule;
    } else {
      data = JSON.parse(special_schedule as string) as any[];
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
    // TODO djr 如果同一天routeIds重复，去重
    return this.prisma.extraSchedule.create({ data: createExtraScheduleDto });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'schedule_id',
      // 'route_id',
    ]);
    const data = await this.prisma.extraSchedule.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.extraSchedule.count({ where });

    return { data, total, pageNum, pageSize: take };

    // return this.prisma.extraSchedule.findMany();
  }

  findOne(id: number) {
    return this.prisma.extraSchedule.findUnique({ where: { schedule_id: id } });
  }

  update(id: number, updateExtraScheduleDto: Prisma.ExtraScheduleUpdateInput) {
    return this.prisma.extraSchedule.update({
      where: { schedule_id: id },
      data: updateExtraScheduleDto,
    });
  }

  remove(id: number) {
    return this.prisma.extraSchedule.delete({ where: { schedule_id: id } });
  }
}
