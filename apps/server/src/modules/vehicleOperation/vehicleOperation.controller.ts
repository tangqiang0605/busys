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
import { VehicleOperationService } from './vehicleOperation.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('vehicleOperation')
export class VehicleOperationController {
  constructor(private readonly vehicleOperationService: VehicleOperationService) {}

  @Post()
  async create(@Body() createVehicleOperationDto: Prisma.VehicleOperationCreateInput) {
    try {
      const result = await this.vehicleOperationService.create(createVehicleOperationDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.vehicleOperationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleOperationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleOperationDto: Prisma.VehicleOperationUpdateInput,
  ) {
    return this.vehicleOperationService.update(+id, updateVehicleOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleOperationService.remove(+id);
  }
}
