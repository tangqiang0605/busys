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
import { FacilityTypesService } from './facilityTypes.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('facilityTypes')
export class FacilityTypesController {
  constructor(private readonly facilityTypesService: FacilityTypesService) {}

  @Post()
  create(@Body() createFacilityTypesDto: Prisma.FacilityTypesCreateInput) {
    return this.facilityTypesService.create(createFacilityTypesDto);
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.facilityTypesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityTypesDto: Prisma.FacilityTypesUpdateInput,
  ) {
    return this.facilityTypesService.update(+id, updateFacilityTypesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityTypesService.remove(+id);
  }
}
