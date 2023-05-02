import { UserLoginDTO } from '@auth/dto/user.login.dto';
import { UserRegisterDTO } from '@auth/dto/user.register.dto';
import { AuthService } from '@auth/service/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: '성공',
  })
  @ApiBody({
    type: UserRegisterDTO,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('/register')
  async createUser(@Body() body: UserRegisterDTO) {
    return await this.authService.createUser(body);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({
    description: '성공',
  })
  @Post('/login')
  async login(@Body() body: UserLoginDTO) {
    return this.authService.login(body);
  }
}
