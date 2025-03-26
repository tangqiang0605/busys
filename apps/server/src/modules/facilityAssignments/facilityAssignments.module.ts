import { Module } from '@nestjs/common';
import { FacilityAssignmentsController } from './facilityAssignments.controller';
import { FacilityAssignmentsService } from './facilityAssignments.service';

@Module({
  controllers: [FacilityAssignmentsController],
  providers: [FacilityAssignmentsService],
})
export class FacilityAssignmentsModule {}
