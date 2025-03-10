import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../middleware/prisma.service';
import { NewsReviewsService } from './news-reviews.service';
import { CreateNewsReviewDto } from './dto/create-news-review.dto';
import { UpdateNewsReviewDto } from './dto/update-news-review.dto';
import { NotFoundException } from '@nestjs/common';

describe('NewsReviewsService', () => {
  let service: NewsReviewsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsReviewsService,
        {
          provide: PrismaService,
          useValue: {
            newsReview: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            news: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NewsReviewsService>(NewsReviewsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a news review', async () => {
      const createNewsReviewDto: CreateNewsReviewDto = {
        news_id: 1,
        reviewer_id: 1,
        status: 'pending',
        comment: 'Test Comment',
      };
  
      const mockNews = {
        id: 1,
        title: 'Test News',
        content: 'Test Content',
        category_id: 1,
        status: 'draft',
        usr_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: null,
      };
  
      const mockReview = {
        id: 1,
        ...createNewsReviewDto,
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      jest.spyOn(prisma.news, 'findUnique').mockResolvedValue(mockNews);
      jest.spyOn(prisma.newsReviews, 'create').mockResolvedValue(mockReview);
  
      const result = await service.create(createNewsReviewDto);
      expect(result).toEqual(mockReview);
      expect(prisma.newsReviews.create).toHaveBeenCalledWith({ data: createNewsReviewDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of news reviews', async () => {
      const reviews = [
        { id: 1, news_id: 1, reviewer_id: 1, status: 'pending', comment: 'Test Comment 1', created_at: new Date(), updated_at: new Date() },
        { id: 2, news_id: 2, reviewer_id: 2, status: 'approved', comment: 'Test Comment 2', created_at: new Date(), updated_at: new Date() },
      ];

      jest.spyOn(prisma.newsReviews, 'findMany').mockResolvedValue(reviews);

      const result = await service.findAll();
      expect(result).toEqual(reviews);
      expect(prisma.newsReviews.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a news review by id', async () => {
      const review = { id: 1, news_id: 1, reviewer_id: 1, status: 'pending', comment: 'Test Comment', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(review);

      const result = await service.findOne(1);
      expect(result).toEqual(review);
      expect(prisma.newsReviews.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if review does not exist', async () => {
      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  // describe('update', () => {
  //   it('should update a news review', async () => {
  //     const updateNewsReviewDto: UpdateNewsReviewDto = { status: 'approved' };
  //     const updatedReview = { id: 1, news_id: 1, reviewer_id: 1, status: 'approved', comment: 'Test Comment', created_at: new Date(), updated_at: new Date() };

  //     jest.spyOn(prisma.newsReview, 'update').mockResolvedValue(updatedReview);

  //     const result = await service.update(1, updateNewsReviewDto);
  //     expect(result).toEqual(updatedReview);
  //     expect(prisma.newsReview.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateNewsReviewDto });
  //   });

  //   it('should throw NotFoundException if review does not exist', async () => {
  //     const updateNewsReviewDto: UpdateNewsReviewDto = { status: 'approved' };

  //     jest.spyOn(prisma.newsReview, 'findUnique').mockResolvedValue(null);

  //     await expect(service.update(999, updateNewsReviewDto)).rejects.toThrow(NotFoundException);
  //   });
  // });


  describe('update', () => {
    it('should update a news review', async () => {
      const updateNewsReviewDto: UpdateNewsReviewDto = { status: 'approved' };
      const mockReview = {
        id: 1,
        news_id: 1,
        reviewer_id: 1,
        status: 'pending',
        comment: 'Test Comment',
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(mockReview);
      jest.spyOn(prisma.newsReviews, 'update').mockResolvedValue({
        ...mockReview,
        status: 'approved',
      });
  
      const result = await service.update(1, updateNewsReviewDto);
      expect(result).toEqual({
        ...mockReview,
        status: 'approved',
      });
      expect(prisma.newsReviews.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateNewsReviewDto,
      });
    });
  
    it('should throw NotFoundException if review does not exist', async () => {
      const updateNewsReviewDto: UpdateNewsReviewDto = { status: 'approved' };
  
      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(null);
  
      await expect(service.update(999, updateNewsReviewDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a news review', async () => {
      const review = { id: 1, news_id: 1, reviewer_id: 1, status: 'pending', comment: 'Test Comment', created_at: new Date(), updated_at: new Date() };

      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(review);
      jest.spyOn(prisma.newsReviews, 'delete').mockResolvedValue(review);

      const result = await service.remove(1);
      expect(result).toEqual(review);
      expect(prisma.newsReviews.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if review does not exist', async () => {
      jest.spyOn(prisma.newsReviews, 'findUnique').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});