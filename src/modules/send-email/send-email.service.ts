// File: src/resend/resend.service.ts
// ResendService chứa logic để giao tiếp với API Resend.

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class ResendService {
  private resend: Resend;
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      // Báo lỗi nếu khóa API không tồn tại.
      throw new InternalServerErrorException('Không tìm thấy khóa API Resend. Vui lòng kiểm tra tệp .env.');
    }
    this.resend = new Resend(apiKey);
    this.fromEmail = 'onboarding@resend.dev'; // Thay thế bằng địa chỉ email đã xác minh của bạn
  }

  // Phương thức gửi email
  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const { to, subject, html } = sendEmailDto;
      console.log(sendEmailDto);
      
      const { data, error } = await this.resend.emails.send({
        from: this.fromEmail,
        to: to,
        subject: subject,
        html: html,
      });

      if (error) {
        // Xử lý lỗi từ API Resend.
        throw new InternalServerErrorException(error.message || 'Lỗi khi gửi email.');
      }

      console.log('Email đã được gửi thành công:', data);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Lỗi khi gửi email.');
    }
  }
}
