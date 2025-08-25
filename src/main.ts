// File: main.ts
// Cập nhật để cấu hình CORS tường minh cho môi trường production

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS một cách tường minh để khắc phục lỗi trên Vercel
  const corsOptions = {
    origin: ['http://localhost:8000', 'https://www.ngoctinhsolar.site'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000); // Sử dụng process.env.PORT cho Vercel
  console.log(`Ứng dụng đang chạy trên cổng ${process.env.PORT || 3000}`);
}
bootstrap();
