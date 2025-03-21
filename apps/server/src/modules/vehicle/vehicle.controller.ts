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
import { VehicleService } from './vehicle.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: Prisma.VehicleCreateInput) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    // TODO djr 参数处理，使其支持按购买日期查找
    return this.vehicleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: Prisma.VehicleUpdateInput,
  ) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
