// File: main.ts
// Cấu hình CORS cho NestJS trên Vercel

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsMiddleware } from './middleware/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tắt CORS mặc định của NestJS
  // app.enableCors();

  // Sử dụng middleware CORS tùy chỉnh
  app.use(new CorsMiddleware().use);

  // Hoặc cấu hình CORS đơn giản hơn
  app.enableCors({
    origin: true, // Cho phép tất cả origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Ứng dụng đang chạy trên cổng ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch(err => {
  console.error('❌ Lỗi khởi động ứng dụng:', err);
  process.exit(1);
});