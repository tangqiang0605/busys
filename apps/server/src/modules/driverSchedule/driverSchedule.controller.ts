import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverScheduleService } from './driverSchedule.service';
import { Prisma } from '@prisma/client';

@Controller('driverSchedule')
export class DriverScheduleController {
  constructor(private readonly driverScheduleService: DriverScheduleService) { }

  @Post()
  create(@Body() createDriverScheduleDto: Prisma.DriverScheduleCreateInput) {
    return this.driverScheduleService.create(createDriverScheduleDto);
  }

  @Get()
  findAll() {
    return this.driverScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverScheduleDto: Prisma.
    DriverScheduleUpdateInput) {
    return this.driverScheduleService.update(+id, updateDriverScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverScheduleService.remove(+id);
  }
};
