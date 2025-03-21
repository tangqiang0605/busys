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
import { ExtraScheduleService } from './extraSchedule.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from '../../common/interceptors/cache-buster.interceptor';

// TODO 后面还需要和职工假勤表、评价表结合起来
@Controller('extraSchedule')
export class ExtraScheduleController {
  constructor(private readonly extraScheduleService: ExtraScheduleService) {}

  @Post()
  async create(
    @Body() createExtraScheduleDto: Prisma.ExtraScheduleCreateInput,
  ) {
    try {
      const result = await this.extraScheduleService.create(
        createExtraScheduleDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.extraScheduleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExtraScheduleDto: Prisma.ExtraScheduleUpdateInput,
  ) {
    return this.extraScheduleService.update(+id, updateExtraScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraScheduleService.remove(+id);
  }
}
