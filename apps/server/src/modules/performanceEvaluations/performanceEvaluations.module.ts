import { Module } from '@nestjs/common';
import { PerformanceEvaluationsController } from './performanceEvaluations.controller';
import { PerformanceEvaluationsService } from './performanceEvaluations.service';

@Module({
  controllers: [PerformanceEvaluationsController],
  providers: [PerformanceEvaluationsService],
})
export class PerformanceEvaluationsModule {}
