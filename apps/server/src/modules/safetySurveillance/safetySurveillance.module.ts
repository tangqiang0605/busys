import { Module } from '@nestjs/common';
import { SafetySurveillanceController } from './safetySurveillance.controller';
import { SafetySurveillanceService } from './safetySurveillance.service';

@Module({
  controllers: [SafetySurveillanceController],
  providers: [SafetySurveillanceService],
})
export class SafetySurveillanceModule {}
