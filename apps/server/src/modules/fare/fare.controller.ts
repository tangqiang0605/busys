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
import { FareService } from './fare.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('fare')
export class FareController {
  constructor(private readonly fareService: FareService) {}

  @Post()
  async create(@Body() createFareDto: Prisma.FareCreateInput) {
    try {
      const result = await this.fareService.create(createFareDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.fareService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fareService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFareDto: Prisma.FareUpdateInput,
  ) {
    return this.fareService.update(+id, updateFareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fareService.remove(+id);
  }
}
