import { Module } from '@nestjs/common';
import { ResendService } from './send-email.service';
import { AppController } from './send-email.controller';

@Module({
  controllers: [AppController],
  providers: [ResendService],
})
export class SendEmailModule {}
