import { Module } from '@nestjs/common';
import { DriverScheduleController } from './driverSchedule.controller';
import { DriverScheduleService } from './driverSchedule.service';

@Module({
  controllers: [DriverScheduleController],
  providers: [DriverScheduleService],
})
export class DriverScheduleModule { };