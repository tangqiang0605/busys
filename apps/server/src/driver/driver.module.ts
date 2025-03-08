import { Logger, Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
  controllers: [DriverController],
  providers: [DriverService, Logger],
})
export class DriverModule { }
