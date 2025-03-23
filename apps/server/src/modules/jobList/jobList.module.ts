import { Module } from '@nestjs/common';
import { JobListController } from './jobList.controller';
import { JobListService } from './jobList.service';

@Module({
  controllers: [JobListController],
  providers: [JobListService],
})
export class JobListModule {}
