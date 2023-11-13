import { UserLoginDTO } from '@auth/dto/user.login.dto';
import { UserRegisterDTO } from '@auth/dto/user.register.dto';
import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { AuthService } from '@auth/service/auth.service';
import { CurrentUser } from '@common/decorators/user.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({
    type: UserRegisterDTO,
  })
  async createUser(@Body() body: UserRegisterDTO) {
    return await this.authService.createUser(body);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() body: UserLoginDTO) {
    return this.authService.login(body);
  }

  @Get('/login')
  @ApiOperation({ summary: '로그인 유저 정보' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async loginUser(@CurrentUser() currentUser: Users) {
    return this.authService.loginUser(currentUser);
  }
}
