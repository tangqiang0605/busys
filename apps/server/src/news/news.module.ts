import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { PrismaModule } from '../middleware/prisma.module';


@Module({
  imports: [PrismaModule], // 导入 PrismaModule
  controllers: [NewsController],
  providers: [NewsService]
  
})
export class NewsModule {}
