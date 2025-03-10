import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { NewsCategoriesService } from './news-categories.service';
  import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
  import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
  
  @Controller('news-categories')
  export class NewsCategoriesController {
    constructor(private readonly newsCategoriesService: NewsCategoriesService) {}
  
    @Post()
    create(@Body() createNewsCategoryDto: CreateNewsCategoryDto) {
      return this.newsCategoriesService.create(createNewsCategoryDto);
    }
  
    @Get()
    findAll() {
      return this.newsCategoriesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.newsCategoriesService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateNewsCategoryDto: UpdateNewsCategoryDto,
    ) {
      return this.newsCategoriesService.update(+id, updateNewsCategoryDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.newsCategoriesService.remove(+id);
    }
  }