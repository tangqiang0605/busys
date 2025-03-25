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
import { FareBillsService } from './fareBills.service';
import { Bills, FareBills, Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('fareBills')
export class FareBillsController {
  constructor(private readonly fareBillsService: FareBillsService) {}

  @Post()
  async create(
    @Body() createFareBillsDto: Prisma.FareBillsCreateInput & FareBills & Bills,
  ) {
    try {
      const result = await this.fareBillsService.create(createFareBillsDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.fareBillsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fareBillsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFareBillsDto: Prisma.FareBillsUpdateInput & Bills & FareBills,
  ) {
    return this.fareBillsService.update(+id, updateFareBillsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fareBillsService.remove(+id);
  }
}
