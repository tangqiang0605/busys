import { Module } from '@nestjs/common';
import { StationSurveillanceController } from './stationSurveillance.controller';
import { StationSurveillanceService } from './stationSurveillance.service';

@Module({
  controllers: [StationSurveillanceController],
  providers: [StationSurveillanceService],
})
export class StationSurveillanceModule {}
