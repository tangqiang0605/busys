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
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FixedScheduleService } from './fixedSchedule.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from '../../common/interceptors/cache-buster.interceptor';

@Controller('fixedSchedule')
export class FixedScheduleController {
  constructor(private readonly fixedScheduleService: FixedScheduleService) {}

  @Post()
  async create(
    @Body() createFixedScheduleDto: Prisma.FixedScheduleCreateInput,
  ) {
    try {
      const result = await this.fixedScheduleService.create(
        createFixedScheduleDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.fixedScheduleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fixedScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFixedScheduleDto: Prisma.FixedScheduleUpdateInput,
  ) {
    return this.fixedScheduleService.update(+id, updateFixedScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fixedScheduleService.remove(+id);
  }
}
