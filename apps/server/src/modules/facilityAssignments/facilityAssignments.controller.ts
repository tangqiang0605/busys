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
import { FacilityAssignmentsService } from './facilityAssignments.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('facilityAssignments')
export class FacilityAssignmentsController {
  constructor(private readonly facilityAssignmentsService: FacilityAssignmentsService) {}

  @Post()
  async create(@Body() createFacilityAssignmentsDto: Prisma.FacilityAssignmentsCreateInput) {
    try {
      const result = await this.facilityAssignmentsService.create(createFacilityAssignmentsDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.facilityAssignmentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityAssignmentsDto: Prisma.FacilityAssignmentsUpdateInput,
  ) {
    return this.facilityAssignmentsService.update(+id, updateFacilityAssignmentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityAssignmentsService.remove(+id);
  }
}
