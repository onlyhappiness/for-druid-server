import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';
import { UserService } from '@user/service/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 프로필 수정' })
  @Put('/profile')
  async updateProfile(@CurrentUser() currentUser: Users, @Body() body) {
    // console.log('usest: ', currentUser);
    return await this.userService.updateProfile(currentUser, body);
  }
}
