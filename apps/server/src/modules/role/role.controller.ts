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
import { RoleService } from './role.service';
import { Prisma } from '@prisma/client';
import { createCacheBusterInterceptor } from 'src/common/interceptors/cache-buster.interceptor';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: Prisma.RoleCreateInput) {
    try {
      const result = await this.roleService.create(createRoleDto);
      return result;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseInterceptors(createCacheBusterInterceptor(['timestamp', 'timeStamp']))
  findAll(@Query() query: any) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: Prisma.RoleUpdateInput,
  ) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
