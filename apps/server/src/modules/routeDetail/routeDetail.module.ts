import { Module } from '@nestjs/common';
import { RouteDetailController } from './routeDetail.controller';
import { RouteDetailService } from './routeDetail.service';
import { RouteService } from '../route/route.service';
import { StationService } from '../station/station.service';

@Module({
  controllers: [RouteDetailController],
  providers: [RouteDetailService, RouteService, StationService],
})
export class RouteDetailModule { };