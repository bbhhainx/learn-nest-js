// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Đảm bảo có thể sử dụng PrismaService ở module khác
})
export class PrismaModule {}
