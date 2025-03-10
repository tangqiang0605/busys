import { Test, TestingModule } from '@nestjs/testing';
import { NewsCategoriesController } from './news-categories.controller';
import { NewsCategoriesService } from './news-categories.service';

describe('NewsCategoriesController', () => {
  let controller: NewsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsCategoriesController],
      providers: [
        {
          provide: NewsCategoriesService,
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

    controller = module.get<NewsCategoriesController>(NewsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});