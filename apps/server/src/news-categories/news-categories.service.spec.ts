import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../middleware/prisma.service';
import { NewsCategoriesService } from './news-categories.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
import { NotFoundException } from '@nestjs/common';

describe('NewsCategoriesService', () => {
  let service: NewsCategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsCategoriesService,
        {
          provide: PrismaService,
          useValue: {
            newsCategory: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NewsCategoriesService>(NewsCategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a news category', async () => {
      const createNewsCategoryDto: CreateNewsCategoryDto = { name: 'Test Category' };
      const mockCategory = {
        id: 1,
        name: 'Test Category',
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      jest.spyOn(prisma.newsCategories, 'create').mockResolvedValue(mockCategory);
  
      const result = await service.create(createNewsCategoryDto);
      expect(result).toEqual(mockCategory);
      expect(prisma.newsCategories.create).toHaveBeenCalledWith({ data: createNewsCategoryDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of news categories', async () => {
      const categories = [
        { id: 1, name: 'Test Category 1', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'Test Category 2', created_at: new Date(), updated_at: new Date() },
      ];

      jest.spyOn(prisma.newsCategories, 'findMany').mockResolvedValue(categories);

      const result = await service.findAll();
      expect(result).toEqual(categories);
      expect(prisma.newsCategories.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a news category by id', async () => {
      const category = { id: 1, name: 'Test Category', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(category);

      const result = await service.findOne(1);
      expect(result).toEqual(category);
      expect(prisma.newsCategories.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should update a news category', async () => {
  //     const updateNewsCategoryDto: UpdateNewsCategoryDto = { name: 'Updated Category Name' };
  //     const updatedCategory = { id: 1, name: 'Updated Category Name', created_at: new Date(), updated_at: new Date() };

  //     jest.spyOn(prisma.newsCategory, 'update').mockResolvedValue(updatedCategory);

  //     const result = await service.update(1, updateNewsCategoryDto);
  //     expect(result).toEqual(updatedCategory);
  //     expect(prisma.newsCategory.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateNewsCategoryDto });
  //   });

  //   it('should throw NotFoundException if category does not exist', async () => {
  //     const updateNewsCategoryDto: UpdateNewsCategoryDto = { name: 'Updated Category Name' };

  //     jest.spyOn(prisma.newsCategory, 'findUnique').mockResolvedValue(null);

  //     await expect(service.update(999, updateNewsCategoryDto)).rejects.toThrow(NotFoundException);
  //   });
  // });


  describe('update', () => {
    it('should update a news category', async () => {
      const updateNewsCategoryDto: UpdateNewsCategoryDto = { name: 'Updated Category Name' };
      const mockCategory = {
        id: 1,
        name: 'Test Category',
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(mockCategory);
      jest.spyOn(prisma.newsCategories, 'update').mockResolvedValue({
        ...mockCategory,
        name: 'Updated Category Name',
      });
  
      const result = await service.update(1, updateNewsCategoryDto);
      expect(result).toEqual({
        ...mockCategory,
        name: 'Updated Category Name',
      });
      expect(prisma.newsCategories.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateNewsCategoryDto,
      });
    });
  
    it('should throw NotFoundException if category does not exist', async () => {
      const updateNewsCategoryDto: UpdateNewsCategoryDto = { name: 'Updated Category Name' };
  
      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(null);
  
      await expect(service.update(999, updateNewsCategoryDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a news category', async () => {
      const category = { id: 1, name: 'Test Category', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(category);
      jest.spyOn(prisma.newsCategories, 'delete').mockResolvedValue(category);

      const result = await service.remove(1);
      expect(result).toEqual(category);
      expect(prisma.newsCategories.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      jest.spyOn(prisma.newsCategories, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});