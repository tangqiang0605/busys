import { Controller, Get, Post, Body, UseInterceptors, Param, Delete, Logger, Query, Patch } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Prisma } from '@prisma/client';
import { CacheBusterInterceptor } from '../middleware/cache-buster.interceptor';
// import { CreateDriverDto } from './dto/create-driver.dto';
// import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService, private readonly logger: Logger) { }

  // TODO 做分页会不会好一些
  @Get('getAll')
  @UseInterceptors(CacheBusterInterceptor)
  async getAllDriverInfo(@Query() params) {
    this.logger.debug(params)
    return this.driverService.findAll(params);
  }

  @Post('create_driver_and_employee')
  createDriverAndEmployee(@Body() body: {
    driverInfo: Prisma.DriverInfoCreateInput;
    employee: Prisma.EmployeeCreateInput;
  }) {
    return this.driverService.createDriver(body);
  }

  @Get()
  findAll(@Param() params) {
    return this.driverService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: any) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.removeDriverInfo(+id);
  }
}
