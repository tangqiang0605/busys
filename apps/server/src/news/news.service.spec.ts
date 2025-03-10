import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../middleware/prisma.service';

import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NotFoundException } from '@nestjs/common';

describe('NewsService', () => {
  let service: NewsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: PrismaService,
          useValue: {
            news: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            newsCategory: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
  it('should create a news item', async () => {
    const createNewsDto: CreateNewsDto = {
      title: 'Test News',
      content: 'Test Content',
      category_id: 1,
      status: 'draft',
      usr_id: 1,
    };

    const mockCategory = {
      id: 1,
      name: 'Test Category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const mockNews = {
      id: 1,
      ...createNewsDto,
      created_at: new Date(),
      updated_at: new Date(),
      published_at: null,
    };

    jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(mockCategory);
    jest.spyOn(prisma.news, 'create').mockResolvedValue(mockNews);

    const result = await service.create(createNewsDto);
    expect(result).toEqual(mockNews);
    expect(prisma.news.create).toHaveBeenCalledWith({ data: createNewsDto });
  });
});

  describe('findAll', () => {
    it('should return an array of news items', async () => {
      const newsItems = [
        { id: 1, title: 'Test News 1', content: 'Test Content 1', category_id: 1, status: 'draft', usr_id: 1, created_at: new Date(), updated_at: new Date(), published_at: null },
        { id: 2, title: 'Test News 2', content: 'Test Content 2', category_id: 2, status: 'published', usr_id: 2, created_at: new Date(), updated_at: new Date(), published_at: new Date() },
      ];

      jest.spyOn(prisma.news, 'findMany').mockResolvedValue(newsItems);

      const result = await service.findAll();
      expect(result).toEqual(newsItems);
      expect(prisma.news.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a news item by id', async () => {
      const newsItem = { id: 1, title: 'Test News', content: 'Test Content', category_id: 1, status: 'draft', usr_id: 1, created_at: new Date(), updated_at: new Date(), published_at: null };

      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(newsItem);

      const result = await service.findOne(1);
      expect(result).toEqual(newsItem);
      expect(prisma.news.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if news item does not exist', async () => {
      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a news item', async () => {
      const updateNewsDto: UpdateNewsDto = { title: 'Updated News Title' };
      const updatedNews = { id: 1, title: 'Updated News Title', content: 'Test Content', category_id: 1, status: 'draft', usr_id: 1, created_at: new Date(), updated_at: new Date(), published_at: null };

      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue({ id: 1, title: 'Test News', content: 'Test Content', category_id: 1, status: 'draft', usr_id: 1, created_at: new Date(), updated_at: new Date(), published_at: null });
      jest.spyOn(prisma.news, 'update').mockResolvedValue(updatedNews);

      const result = await service.update(1, updateNewsDto);
      expect(result).toEqual(updatedNews);
      expect(prisma.news.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateNewsDto });
    });

    it('should throw NotFoundException if news item does not exist', async () => {
      const updateNewsDto: UpdateNewsDto = { title: 'Updated News Title' };

      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(null);

      await expect(service.update(999, updateNewsDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a news item', async () => {
      const newsItem = { id: 1, title: 'Test News', content: 'Test Content', category_id: 1, status: 'draft', usr_id: 1, created_at: new Date(), updated_at: new Date(), published_at: null };

      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(newsItem);
      jest.spyOn(prisma.news, 'delete').mockResolvedValue(newsItem);

      const result = await service.remove(1);
      expect(result).toEqual(newsItem);
      expect(prisma.news.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if news item does not exist', async () => {
      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});