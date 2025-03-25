import { Module } from '@nestjs/common';
import { FareBillsController } from './fareBills.controller';
import { FareBillsService } from './fareBills.service';

@Module({
  controllers: [FareBillsController],
  providers: [FareBillsService],
})
export class FareBillsModule {}
