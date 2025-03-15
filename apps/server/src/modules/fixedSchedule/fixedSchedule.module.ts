import { Module } from '@nestjs/common';
import { FixedScheduleController } from './fixedSchedule.controller';
import { FixedScheduleService } from './fixedSchedule.service';

@Module({
  controllers: [FixedScheduleController],
  providers: [FixedScheduleService],
})
export class FixedScheduleModule { };