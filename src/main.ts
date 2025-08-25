// File: main.ts
// Cấu hình CORS cho NestJS trên Vercel

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS toàn diện cho Vercel
  const corsOptions = {
    origin: [
      'http://localhost:8080',
      'http://localhost:3000', // Thêm port 3000 nếu frontend chạy trên port này
      'https://www.ngoctinhsolar.site',
      'https://ngoctinhsolar.site', // Thêm version không có www
      // Thêm domain Vercel của backend nếu cần
      /\.vercel\.app$/, // Cho phép tất cả subdomain .vercel.app
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  // Thêm global prefix nếu cần
  // app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Thêm '0.0.0.0' để bind tất cả interfaces
  
  console.log(`🚀 Ứng dụng đang chạy trên cổng ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap().catch(err => {
  console.error('❌ Lỗi khởi động ứng dụng:', err);
  process.exit(1);
});