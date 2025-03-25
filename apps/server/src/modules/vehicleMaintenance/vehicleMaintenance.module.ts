import { Module } from '@nestjs/common';
import { VehicleMaintenanceController } from './vehicleMaintenance.controller';
import { VehicleMaintenanceService } from './vehicleMaintenance.service';

@Module({
  controllers: [VehicleMaintenanceController],
  providers: [VehicleMaintenanceService],
})
export class VehicleMaintenanceModule {}
