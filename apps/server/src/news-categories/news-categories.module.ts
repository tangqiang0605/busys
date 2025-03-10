import { Module } from '@nestjs/common';
import { NewsCategoriesController } from './news-categories.controller';
import { NewsCategoriesService } from './news-categories.service';
import { PrismaModule } from '../middleware/prisma.module';


@Module({
  imports: [PrismaModule], // 导入 PrismaModule
  controllers: [NewsCategoriesController],
  providers: [NewsCategoriesService]
})
export class NewsCategoriesModule {}
