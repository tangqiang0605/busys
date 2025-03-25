import { Module } from '@nestjs/common';
import { StationMaintenanceController } from './stationMaintenance.controller';
import { StationMaintenanceService } from './stationMaintenance.service';

@Module({
  controllers: [StationMaintenanceController],
  providers: [StationMaintenanceService],
})
export class StationMaintenanceModule {}
