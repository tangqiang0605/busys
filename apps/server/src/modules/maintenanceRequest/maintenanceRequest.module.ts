import { Module } from '@nestjs/common';
import { MaintenanceRequestController } from './maintenanceRequest.controller';
import { MaintenanceRequestService } from './maintenanceRequest.service';

@Module({
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService],
})
export class MaintenanceRequestModule {}
