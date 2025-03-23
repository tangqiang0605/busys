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
import { EmployeePositionsService } from './employeePositions.service';
import { EmployeePositions, Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('employeePositions')
export class EmployeePositionsController {
  constructor(
    private readonly employeePositionsService: EmployeePositionsService,
  ) {}

  @Post()
  async create(
    @Body()
    createEmployeePositionsDto: Prisma.EmployeePositionsCreateInput &
      EmployeePositions,
  ) {
    try {
      const reuslt = await this.employeePositionsService.create(
        createEmployeePositionsDto,
      );
      return reuslt;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.employeePositionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePositionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeePositionsDto: Prisma.EmployeePositionsUpdateInput,
  ) {
    return this.employeePositionsService.update(
      +id,
      updateEmployeePositionsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePositionsService.remove(+id);
  }
}
