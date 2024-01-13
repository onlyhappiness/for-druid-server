import { PickType } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

export class FindEmailDTO extends PickType(Users, ['email'] as const) {}
