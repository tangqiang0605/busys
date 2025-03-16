import { Module } from '@nestjs/common';
import { RouteScheduleController } from './routeSchedule.controller';
import { RouteScheduleService } from './routeSchedule.service';

@Module({
  controllers: [RouteScheduleController],
  providers: [RouteScheduleService],
})
export class RouteScheduleModule { };