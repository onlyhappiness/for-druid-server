import { PickType } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

export class UserRegisterDTO extends PickType(Users, [
  // 'email',
  'phone',
  // 'nickname',
  'nickname',
  'password',
] as const) {}
