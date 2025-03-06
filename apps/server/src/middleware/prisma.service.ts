// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error']
    });
    // 添加查询时长统计中间件
    this.$use(async (params, next) => {
      const start = Date.now();
      const result = await next(params);
      const duration = Date.now() - start;
      console.log(`qihangtang: prisma Query "${params.action}" took ${duration}ms`);
      return result;
    });

  }

  async onModuleInit() {
    const start = Date.now();
    await this.$connect();
    const duration = Date.now() - start;
    console.log(`qihangtang: prisma 连接耗时 Connected to database in ${duration}ms`);
  }

  async onModuleDestroy() {
    const start = Date.now();
    await this.$disconnect();
    const duration = Date.now() - start;
    console.log(`qihangtang: prisma 断开耗时 Disconnected from database in ${duration}ms`);
  }
}