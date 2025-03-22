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
import { StationSurveillanceService } from './stationSurveillance.service';
import { Prisma, StationSurveillance } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('stationSurveillance')
export class StationSurveillanceController {
  constructor(
    private readonly stationSurveillanceService: StationSurveillanceService,
  ) {}

  @Post()
  async create(
    @Body()
    createStationSurveillanceDto: Prisma.StationSurveillanceCreateInput &
      StationSurveillance,
  ) {
    try {
      const result = await this.stationSurveillanceService.create(
        createStationSurveillanceDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.stationSurveillanceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationSurveillanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStationSurveillanceDto: Prisma.StationSurveillanceUpdateInput,
  ) {
    return this.stationSurveillanceService.update(
      +id,
      updateStationSurveillanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationSurveillanceService.remove(+id);
  }
}
