import { PickType } from '@nestjs/swagger';
import { EmailVerification } from '../model/email-verification.entity';

export class SendEmailDTO extends PickType(EmailVerification, [
  'to',
] as const) {}
