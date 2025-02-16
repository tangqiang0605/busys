// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 标记为全局模块
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }