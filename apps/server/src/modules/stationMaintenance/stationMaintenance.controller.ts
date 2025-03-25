import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StationMaintenanceService } from './stationMaintenance.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('stationMaintenance')
export class StationMaintenanceController {
  constructor(
    private readonly stationMaintenanceService: StationMaintenanceService,
  ) {}

  @Post()
  async create(
    @Body()
    createStationMaintenanceDto: Prisma.StationMaintenanceCreateInput & {
      station_id: string;
      request_id: string;
      staff_id: string;
    },
  ) {
    try {
      const result = await this.stationMaintenanceService.create(
        createStationMaintenanceDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.stationMaintenanceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationMaintenanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStationMaintenanceDto: Prisma.StationMaintenanceUpdateInput,
  ) {
    return this.stationMaintenanceService.update(
      +id,
      updateStationMaintenanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationMaintenanceService.remove(+id);
  }
}
