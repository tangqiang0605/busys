import { Module } from '@nestjs/common';
import { FacilityRequestsController } from './facilityRequests.controller';
import { FacilityRequestsService } from './facilityRequests.service';

@Module({
  controllers: [FacilityRequestsController],
  providers: [FacilityRequestsService],
})
export class FacilityRequestsModule {}
