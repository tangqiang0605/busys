import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { StationService } from './station.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from '../../common/interceptors/cache-buster.interceptor';

@Controller('station')
export class StationController {
  constructor(private readonly stationService: StationService) { }

  @Post()
  create(@Body() createStationDto: Prisma.StationCreateInput) {
    return this.stationService.create(createStationDto);
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query) {
    return this.stationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStationDto: Prisma.
    StationUpdateInput) {
    return this.stationService.update(+id, updateStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationService.remove(+id);
  }
};
