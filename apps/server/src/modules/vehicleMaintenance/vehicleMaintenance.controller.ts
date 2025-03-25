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
import { VehicleMaintenanceService } from './vehicleMaintenance.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('vehicleMaintenance')
export class VehicleMaintenanceController {
  constructor(
    private readonly vehicleMaintenanceService: VehicleMaintenanceService,
  ) {}

  @Post()
  async create(
    @Body()
    createVehicleMaintenanceDto: Prisma.VehicleMaintenanceCreateInput & {
      vehicle_id: number;
    },
  ) {
    try {
      const result = await this.vehicleMaintenanceService.create(
        createVehicleMaintenanceDto,
      );
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.vehicleMaintenanceService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleMaintenanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleMaintenanceDto: Prisma.VehicleMaintenanceUpdateInput,
  ) {
    return this.vehicleMaintenanceService.update(
      +id,
      updateVehicleMaintenanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleMaintenanceService.remove(+id);
  }
}
