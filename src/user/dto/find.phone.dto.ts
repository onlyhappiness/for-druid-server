import { PickType } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

export class FindPhoneDTO extends PickType(Users, ['phone'] as const) {}
