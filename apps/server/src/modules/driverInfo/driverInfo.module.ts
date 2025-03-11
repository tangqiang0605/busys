import { Module } from '@nestjs/common';
import { DriverInfoController } from './driverInfo.controller';
import { DriverInfoService } from './driverInfo.service';

@Module({
  controllers: [DriverInfoController],
  providers: [DriverInfoService],
})
export class DriverInfoModule { };