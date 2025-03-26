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
  Logger,
} from '@nestjs/common';
import { FacilityRequestsService } from './facilityRequests.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('facilityRequests')
export class FacilityRequestsController {
  constructor(
    private readonly facilityRequestsService: FacilityRequestsService,
  ) {}

  @Post()
  async create(
    @Body() createFacilityRequestsDto: Prisma.FacilityRequestsCreateInput,
  ) {
    try {
      const result = await this.facilityRequestsService.create(
        createFacilityRequestsDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('manager')
  async approval(@Body() body: { id: string; isPass: boolean }) {
    Logger.debug(`manager ${JSON.stringify(body)}`);
    try {
      return this.facilityRequestsService.approval(body);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.facilityRequestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityRequestsDto: Prisma.FacilityRequestsUpdateInput,
  ) {
    return this.facilityRequestsService.update(+id, updateFacilityRequestsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityRequestsService.remove(+id);
  }
}
