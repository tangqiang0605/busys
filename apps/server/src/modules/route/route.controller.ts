import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteService } from './route.service';
import { Prisma } from '@prisma/client';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) { }

  @Post()
  create(@Body() createRouteDto: Prisma.RouteCreateInput) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  findAll() {
    return this.routeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: Prisma.
    RouteUpdateInput) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
};
