import { Module } from '@nestjs/common';
import { EmployeePositionsController } from './employeePositions.controller';
import { EmployeePositionsService } from './employeePositions.service';

@Module({
  controllers: [EmployeePositionsController],
  providers: [EmployeePositionsService],
})
export class EmployeePositionsModule {}
