import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../middleware/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto) {
    const category = await this.prisma.newsCategories.findUnique({
      where: { id: createNewsDto.category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createNewsDto.category_id} not found`);
    }

    return this.prisma.news.create({
      data: createNewsDto,
    });
  }

  async findAll() {
    return this.prisma.news.findMany();
  }

  async findOne(id: number) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });
  }

  async remove(id: number) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.prisma.news.delete({
      where: { id },
    });
  }
}