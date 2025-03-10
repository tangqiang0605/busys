import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../middleware/prisma.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';

@Injectable()
export class NewsCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsCategoryDto: CreateNewsCategoryDto) {
    return this.prisma.newsCategories.create({
      data: createNewsCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.newsCategories.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.newsCategories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateNewsCategoryDto: UpdateNewsCategoryDto) {
    const category = await this.prisma.newsCategories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.newsCategories.update({
      where: { id },
      data: updateNewsCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.newsCategories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.newsCategories.delete({
      where: { id },
    });
  }
}