// File: src/resend/dto/send-email.dto.ts
// Data Transfer Object (DTO) định nghĩa cấu trúc dữ liệu cho yêu cầu gửi email.

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ.' })
  @IsNotEmpty({ message: 'Địa chỉ người nhận không được để trống.' })
  to: string;

  @IsString({ message: 'Chủ đề phải là một chuỗi.' })
  @IsNotEmpty({ message: 'Chủ đề không được để trống.' })
  subject: string;

  @IsString({ message: 'Nội dung email phải là một chuỗi.' })
  @IsNotEmpty({ message: 'Nội dung email không được để trống.' })
  html: string;
}
