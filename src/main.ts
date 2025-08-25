// File: main.ts
// Đây là điểm khởi đầu của ứng dụng NestJS.
// Nó khởi tạo ứng dụng và lắng nghe các yêu cầu.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt CORS để cho phép các yêu cầu từ frontend
  // Bạn có thể tùy chỉnh cors() để chỉ cho phép một số domain cụ thể
  app.enableCors();

  // Sử dụng ValidationPipe toàn cục để tự động xác thực các DTO.
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Ứng dụng đang chạy trên http://localhost:3000');
}
bootstrap();
