import { Test, TestingModule } from '@nestjs/testing';
import { NewsReviewsController } from './news-reviews.controller';
import { NewsReviewsService } from './news-reviews.service';

describe('NewsReviewsController', () => {
  let controller: NewsReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsReviewsController],
      providers: [
        {
          provide: NewsReviewsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsReviewsController>(NewsReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});