import { Module } from '@nestjs/common';
import { VehicleOperationController } from './vehicleOperation.controller';
import { VehicleOperationService } from './vehicleOperation.service';

@Module({
  controllers: [VehicleOperationController],
  providers: [VehicleOperationService],
})
export class VehicleOperationModule {}
