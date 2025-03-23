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
import { PerformanceEvaluationsService } from './performanceEvaluations.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('performanceEvaluations')
export class PerformanceEvaluationsController {
  constructor(
    private readonly performanceEvaluationsService: PerformanceEvaluationsService,
  ) {}

  @Post()
  async create(
    @Body()
    createPerformanceEvaluationsDto: Prisma.PerformanceEvaluationsCreateInput & {
      employee_id: string;
    },
  ) {
    try {
      const result = await this.performanceEvaluationsService.create(
        createPerformanceEvaluationsDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.performanceEvaluationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceEvaluationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePerformanceEvaluationsDto: Prisma.PerformanceEvaluationsUpdateInput,
  ) {
    return this.performanceEvaluationsService.update(
      +id,
      updatePerformanceEvaluationsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceEvaluationsService.remove(+id);
  }
}
