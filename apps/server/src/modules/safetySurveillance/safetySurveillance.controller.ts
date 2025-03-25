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
import { SafetySurveillanceService } from './safetySurveillance.service';
import { Prisma, SafetySurveillance } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('safetySurveillance')
export class SafetySurveillanceController {
  constructor(
    private readonly safetySurveillanceService: SafetySurveillanceService,
  ) {}

  @Post()
  async create(
    @Body()
    createSafetySurveillanceDto: Prisma.SafetySurveillanceCreateInput &
      SafetySurveillance,
  ) {
    try {
      const result = await this.safetySurveillanceService.create(
        createSafetySurveillanceDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.safetySurveillanceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.safetySurveillanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSafetySurveillanceDto: Prisma.SafetySurveillanceUpdateInput,
  ) {
    return this.safetySurveillanceService.update(
      +id,
      updateSafetySurveillanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.safetySurveillanceService.remove(+id);
  }
}
