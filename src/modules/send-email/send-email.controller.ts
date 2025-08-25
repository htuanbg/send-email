// File: src/app.controller.ts
// AppController xử lý các yêu cầu HTTP.
// Nó sử dụng ResendService để gửi email khi nhận được yêu cầu POST.

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ResendService } from './send-email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class AppController {
  constructor(private readonly resendService: ResendService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    try {
      await this.resendService.sendEmail(sendEmailDto);
      return { message: 'Email đã được gửi thành công!', status: 'success' };
    } catch (error) {
      throw new HttpException(
        'Không thể gửi email: ' + (error.message || 'Lỗi không xác định'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
