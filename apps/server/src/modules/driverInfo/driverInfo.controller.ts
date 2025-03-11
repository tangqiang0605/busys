import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverInfoService } from './driverInfo.service';
import { Prisma } from '@prisma/client';

@Controller('driverInfo')
export class DriverInfoController {
  constructor(private readonly driverInfoService: DriverInfoService) { }

  @Post()
  create(@Body() createDriverInfoDto: Prisma.DriverInfoCreateInput) {
    return this.driverInfoService.create(createDriverInfoDto);
  }

  @Get()
  findAll() {
    return this.driverInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverInfoDto: Prisma.
    DriverInfoUpdateInput) {
    return this.driverInfoService.update(+id, updateDriverInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverInfoService.remove(+id);
  }
};