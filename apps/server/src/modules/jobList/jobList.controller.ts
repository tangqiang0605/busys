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
} from '@nestjs/common';
import { JobListService } from './jobList.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('jobList')
export class JobListController {
  constructor(private readonly jobListService: JobListService) {}

  @Post()
  create(@Body() createJobListDto: Prisma.JobListCreateInput) {
    return this.jobListService.create(createJobListDto);
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.jobListService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobListDto: Prisma.JobListUpdateInput,
  ) {
    return this.jobListService.update(+id, updateJobListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobListService.remove(+id);
  }
}
