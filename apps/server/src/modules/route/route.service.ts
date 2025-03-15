import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RouteService {
  constructor(private readonly prisma: PrismaService) { }

  create(createRouteDto: Prisma.RouteCreateInput) {
    return this.prisma.route.create({ data: createRouteDto });
  }

  findAll() {
    return this.prisma.route.findMany()
  }

  findOne(id: number) {
    return this.prisma.route.findUnique({ where: { route_id: id } })
  }

  update(id: number, updateRouteDto: Prisma.RouteUpdateInput) {
    return this.prisma.route.update({ where: { route_id: id }, data: updateRouteDto })
  }

  remove(id: number) {
    return this.prisma.route.delete({ where: { route_id: id } })
  }
}