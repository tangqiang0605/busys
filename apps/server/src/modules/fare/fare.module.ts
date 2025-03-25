import { Module } from '@nestjs/common';
import { FareController } from './fare.controller';
import { FareService } from './fare.service';

@Module({
  controllers: [FareController],
  providers: [FareService],
})
export class FareModule {}
