import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { NewsReviewsService } from './news-reviews.service';
  import { CreateNewsReviewDto } from './dto/create-news-review.dto';
  import { UpdateNewsReviewDto } from './dto/update-news-review.dto';
  
  @Controller('news-reviews')
  export class NewsReviewsController {
    constructor(private readonly newsReviewsService: NewsReviewsService) {}
  
    @Post()
    create(@Body() createNewsReviewDto: CreateNewsReviewDto) {
      return this.newsReviewsService.create(createNewsReviewDto);
    }
  
    @Get()
    findAll() {
      return this.newsReviewsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.newsReviewsService.findOne(+id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateNewsReviewDto: UpdateNewsReviewDto,
    ) {
      return this.newsReviewsService.update(+id, updateNewsReviewDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.newsReviewsService.remove(+id);
    }
  }