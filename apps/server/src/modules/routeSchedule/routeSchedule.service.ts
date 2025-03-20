import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, RouteSchedule } from '@prisma/client';
import { buildPageQuery } from 'src/common/utils';

@Injectable()
export class RouteScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createRouteScheduleDto: Prisma.RouteScheduleCreateInput & RouteSchedule,
  ) {
    const [routeExists] = await Promise.all([
      this.prisma.route.findUnique({
        where: { route_id: +createRouteScheduleDto.route_id },
      }),
    ]);

    // 如果 route_id 不存在，抛出错误
    if (!routeExists) {
      throw new Error(`路线 ID ${createRouteScheduleDto.route_id} 不存在`);
    }

    const { route_id, ...remainingData } = createRouteScheduleDto;

    const createData = {
      ...(remainingData as any),
      route: {
        connect: {
          route_id: Number(route_id),
        },
      },
    };

    // 创建 RouteDetail
    return this.prisma.routeSchedule.create({ data: createData });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, [
      'schedule_id',
      'route_id',
    ]);
    const data = await this.prisma.routeSchedule.findMany({
      skip,
      take,
      where,
    });
    const total = await this.prisma.routeSchedule.count({ where });

    return { data, total, pageNum, pageSize: take };
  }

  findOne(id: number) {
    return this.prisma.routeSchedule.findUnique({ where: { schedule_id: id } });
  }

  async update(
    id: number,
    updateRouteScheduleDto: Prisma.RouteScheduleUpdateInput & RouteSchedule,
  ) {
    const { route_id, ...restData } = updateRouteScheduleDto;

    const routeExists = await this.prisma.route.findUnique({
      where: { route_id },
    });
    if (!routeExists) {
      throw new Error(`路线id ${route_id} 不存在`);
    }

    // Logger.debug('qihangtang', updateRouteScheduleDto);
    return this.prisma.routeSchedule.update({
      where: { schedule_id: id },
      data: {
        ...(restData as any),
        route: {
          connect: {
            route_id: route_id,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.routeSchedule.delete({ where: { schedule_id: id } });
  }
}
