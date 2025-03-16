import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, RouteDetail } from '@prisma/client';
import { StationService } from '../station/station.service';
import { RouteService } from '../route/route.service';
import { buildPageQuery, buildWhere } from '../../common/utils';

@Injectable()
export class RouteDetailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly routeService: RouteService,
    private readonly stationService: StationService
  ) { }

  async create(createRouteDetailDto: Prisma.RouteDetailCreateInput & RouteDetail) {
    const [stationExists, routeExists] = await Promise.all([
      this.prisma.station.findUnique({
        where: { station_id: +createRouteDetailDto.station_id },
      }),
      this.prisma.route.findUnique({
        where: { route_id: +createRouteDetailDto.route_id },
      }),
    ]);

    // 如果 station_id 不存在，抛出错误
    if (!stationExists) {
      throw new Error(`车站 ID ${createRouteDetailDto.station_id} 不存在`);
    }

    // 如果 route_id 不存在，抛出错误
    if (!routeExists) {
      throw new Error(`路线 ID ${createRouteDetailDto.route_id} 不存在`);
    }

    // TODO djr station_order 不能和已有的顺序staion_orders重复，在最大station_order+1

    const { station_id, route_id, ...remainingData } = createRouteDetailDto;

    const routeDetailData = {
      // ...remainingData as any,
      station_order: Number(remainingData.station_order),
      route: {
        connect: {
          route_id: Number(route_id)
        }
      },
      station: {
        connect: {
          station_id: Number(station_id)
        }
      }
    }

    // 创建 RouteDetail
    return this.prisma.routeDetail.create({
      data: routeDetailData
    });
  }

  async findAll(params: any) {
    const { skip, take, where, pageNum } = buildPageQuery(params, ['route_id', 'detail_id']);
    // 获取分页数据
    const data = await this.prisma.routeDetail.findMany({
      skip,
      take,
      where,
      include: { route: true }
    });
    const total = await this.prisma.routeDetail.count({ where });

    // 返回分页结果和总数
    return {
      data,
      total,
      pageNum,
      pageSize: take,
    };
  }

  findOne(id: number) {
    return this.prisma.routeDetail.findUnique({ where: { detail_id: id } })
  }

  update(id: number, updateRouteDetailDto: Prisma.RouteDetailUpdateInput) {
    return this.prisma.routeDetail.update({ where: { detail_id: id }, data: updateRouteDetailDto })
  }

  remove(id: number) {
    return this.prisma.routeDetail.delete({ where: { detail_id: id } })
  }

  async updateOrders(stationOrders: Array<{ detail_id: number, station_order: number }>) {
    // TODO djr 不允许有重复station_order 且 station_order > 0
    return await Promise.all(
      stationOrders.map(async (order) => {
        return await this.prisma.routeDetail.update({
          where: { detail_id: order.detail_id },
          data: {
            station_order: order.station_order,
          },
        });
      })
    );
  }
}

