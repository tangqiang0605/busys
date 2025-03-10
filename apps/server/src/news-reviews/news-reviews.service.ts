import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../middleware/prisma.service';
import { CreateNewsReviewDto } from './dto/create-news-review.dto';
import { UpdateNewsReviewDto } from './dto/update-news-review.dto';

@Injectable()
export class NewsReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsReviewDto: CreateNewsReviewDto) {
    const news = await this.prisma.news.findUnique({
      where: { id: createNewsReviewDto.news_id },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${createNewsReviewDto.news_id} not found`);
    }

    return this.prisma.newsReviews.create({
      data: createNewsReviewDto,
    });
  }

  async findAll() {
    return this.prisma.newsReviews.findMany();
  }

  async findOne(id: number) {
    const review = await this.prisma.newsReviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateNewsReviewDto: UpdateNewsReviewDto) {
    const review = await this.prisma.newsReviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.prisma.newsReviews.update({
      where: { id },
      data: updateNewsReviewDto,
    });
  }

  async remove(id: number) {
    const review = await this.prisma.newsReviews.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.prisma.newsReviews.delete({
      where: { id },
    });
  }
}