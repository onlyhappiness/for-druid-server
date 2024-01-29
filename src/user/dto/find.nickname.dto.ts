import { PickType } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

export class FindNicknameDTO extends PickType(Users, ['signname'] as const) {}
