// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super(); // Khởi tạo PrismaClient
  }

  // Hàm này sẽ được gọi khi module được khởi tạo
  async onModuleInit() {
    await this.$connect(); // Kết nối cơ sở dữ liệu
  }

  // Hàm này sẽ được gọi khi module bị hủy
  async onModuleDestroy() {
    await this.$disconnect(); // Đóng kết nối cơ sở dữ liệu
  }
}
