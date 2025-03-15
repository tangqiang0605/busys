import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FixedScheduleService } from './fixedSchedule.service';
import { Prisma } from '@prisma/client';

@Controller('fixedSchedule')
export class FixedScheduleController {
  constructor(private readonly fixedScheduleService: FixedScheduleService) { }

  @Post()
  create(@Body() createFixedScheduleDto: Prisma.FixedScheduleCreateInput) {
    return this.fixedScheduleService.create(createFixedScheduleDto);
  }

  @Get()
  findAll() {
    return this.fixedScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fixedScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFixedScheduleDto: Prisma.
    FixedScheduleUpdateInput) {
    return this.fixedScheduleService.update(+id, updateFixedScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fixedScheduleService.remove(+id);
  }
};
