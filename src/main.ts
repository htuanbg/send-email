// File: main.ts
// Cập nhật để cấu hình CORS toàn diện hơn, giải quyết vấn đề preflight requests

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: ['http://localhost:8080', 'https://www.ngoctinhsolar.site'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    // Thêm tùy chọn này để Vercel xử lý yêu cầu OPTIONS một cách chính xác
    optionsSuccessStatus: 204, // Không có nội dung nhưng thành công
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
  console.log(`Ứng dụng đang chạy trên cổng ${process.env.PORT || 3000}`);
}
bootstrap();
