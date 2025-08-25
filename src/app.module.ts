// File: src/app.module.ts
// AppModule là mô-đun gốc của ứng dụng.
// Nó nhập ConfigModule để tải các biến môi trường và ResendModule.

import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { SendEmailModule } from  './modules/send-email/send-email.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Tải các biến môi trường từ tệp .env
    ConfigModule.forRoot({
      isGlobal: true, // Biến này sẽ có sẵn trên toàn bộ ứng dụng
    }),
    SendEmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
