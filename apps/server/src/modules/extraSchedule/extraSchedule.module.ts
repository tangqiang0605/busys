import { Module } from '@nestjs/common';
import { ExtraScheduleController } from './extraSchedule.controller';
import { ExtraScheduleService } from './extraSchedule.service';
import { RouteService } from '../route/route.service';

@Module({
  controllers: [ExtraScheduleController],
  providers: [ExtraScheduleService, RouteService],
})
export class ExtraScheduleModule {}
