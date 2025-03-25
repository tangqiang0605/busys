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
import { MaintenanceRequestService } from './maintenanceRequest.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';
import { ApprovalStatus, MaintenanceType, RequestType } from './types';

@Controller('maintenanceRequest')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {}

  @Post()
  async create(
    @Body()
    createMaintenanceRequestDto: Prisma.MaintenanceRequestCreateInput & {
      request_type: RequestType;
      maintenance_type: MaintenanceType;
      approval_status: ApprovalStatus;
    },
  ) {
    try {
      const result = await this.maintenanceRequestService.create(
        createMaintenanceRequestDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.maintenanceRequestService.findAll(query);
  }

  @Get('station')
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll4Station(@Query() query: any) {
    return this.maintenanceRequestService.findAll4StationFacility(query);
  }
  @Get('vehicle')
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll4Vehicle(@Query() query: any) {
    return this.maintenanceRequestService.findAll4VehicleFacility(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceRequestDto: Prisma.MaintenanceRequestUpdateInput,
  ) {
    return this.maintenanceRequestService.update(
      +id,
      updateMaintenanceRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceRequestService.remove(+id);
  }
}
