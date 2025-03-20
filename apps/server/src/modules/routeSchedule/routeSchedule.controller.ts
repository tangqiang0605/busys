import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RouteScheduleService } from './routeSchedule.service';
import { Prisma, RouteSchedule } from '@prisma/client';
import { createCacheBusterInterceptor } from '../../common/interceptors/cache-buster.interceptor';

@Controller('routeSchedule')
export class RouteScheduleController {
  constructor(private readonly routeScheduleService: RouteScheduleService) {}

  @Post()
  async create(
    @Body()
    createRouteScheduleDto: Prisma.RouteScheduleCreateInput & RouteSchedule,
  ) {
    try {
      const result = await this.routeScheduleService.create(
        createRouteScheduleDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.routeScheduleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeScheduleService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateRouteScheduleDto: Prisma.RouteScheduleUpdateInput & RouteSchedule,
  ) {
    try {
      const result = await this.routeScheduleService.update(
        +id,
        updateRouteScheduleDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeScheduleService.remove(+id);
  }
}
