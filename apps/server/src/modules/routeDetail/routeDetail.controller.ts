import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpException, HttpStatus, Query, UseInterceptors } from '@nestjs/common';
import { RouteDetailService } from './routeDetail.service';
import { Prisma, RouteDetail } from '@prisma/client';
import { RouteService } from '../route/route.service';
import { StationService } from '../station/station.service';
import { connect } from 'http2';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('routeDetail')
export class RouteDetailController {
  constructor(private readonly routeDetailService: RouteDetailService) { }

  @Post()
  async create(@Body() createRouteDetailDto: Prisma.RouteDetailCreateInput & RouteDetail) {
    try {
      const result = await this.routeDetailService.create(createRouteDetailDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }


  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query) {
    return this.routeDetailService.findAll(query);
  }

  @Patch()
  updateOrders(@Body() stationOrders: Array<{ detail_id: number, station_order: number }>) {
    return this.routeDetailService.updateOrders(stationOrders);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDetailDto: Prisma.
    RouteDetailUpdateInput) {
    return this.routeDetailService.update(+id, updateRouteDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeDetailService.remove(+id);
  }
};
