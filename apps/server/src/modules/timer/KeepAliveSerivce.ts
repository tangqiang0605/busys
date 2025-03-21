import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/common/prisma/prisma.service';
// import { PrismaService } from './prisma.service'; // 假设你有 PrismaService

@Injectable()
export class KeepAliveService {
  constructor(private prisma: PrismaService) {}

  @Cron('*/4 * * * *') // 每4分钟执行一次
  // @Cron('*/10 * * * * *') // 每10秒执行一次
  async keepAlive() {
    // 发送简单查询，例如查询表中的前一行数据
    const result = await this.prisma.$queryRaw`SELECT 1`;
    Logger.warn(
      `[保持查询] Keep alive query executed ${JSON.stringify(result)}`,
    );
  }
}
