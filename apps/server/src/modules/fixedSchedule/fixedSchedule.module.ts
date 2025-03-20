import { Module } from '@nestjs/common';
import { FixedScheduleController } from './fixedSchedule.controller';
import { FixedScheduleService } from './fixedSchedule.service';
import { RouteService } from '../route/route.service';

@Module({
  controllers: [FixedScheduleController],
  providers: [FixedScheduleService, RouteService],
})
export class FixedScheduleModule {}
