import { PickType } from '@nestjs/swagger';
import { Verification } from '@verification/model/verification.entity';

export class SmsRequestDto extends PickType(Verification, ['to'] as const) {}
