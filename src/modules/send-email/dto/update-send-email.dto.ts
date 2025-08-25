import { PartialType } from '@nestjs/mapped-types';
import { SendEmailDto } from './send-email.dto';

export class UpdateSendEmailDto extends PartialType(SendEmailDto) {}
