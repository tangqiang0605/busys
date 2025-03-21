import { Module } from '@nestjs/common';
import { FacilityTypesController } from './facilityTypes.controller';
import { FacilityTypesService } from './facilityTypes.service';

@Module({
  controllers: [FacilityTypesController],
  providers: [FacilityTypesService],
})
export class FacilityTypesModule {}
