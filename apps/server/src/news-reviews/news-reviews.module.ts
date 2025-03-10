import { Module } from '@nestjs/common';
import { NewsReviewsController } from './news-reviews.controller';
import { NewsReviewsService } from './news-reviews.service';
import { PrismaModule } from '../middleware/prisma.module';


@Module({
  imports: [PrismaModule], // 导入 PrismaModule

  controllers: [NewsReviewsController],
  providers: [NewsReviewsService]
})
export class NewsReviewsModule {}
