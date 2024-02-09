import { PickType } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

export class UserLoginDTO extends PickType(Users, [
  // 'email',
  'loginType',
  'signname',
  'password',
] as const) {}
