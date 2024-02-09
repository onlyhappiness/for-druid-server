import { PickType } from '@nestjs/swagger';
import { Verification } from '@verification/model/verification.entity';

export class SmsVerifyDto extends PickType(Verification, [
  'to',
  'key',
] as const) {}
