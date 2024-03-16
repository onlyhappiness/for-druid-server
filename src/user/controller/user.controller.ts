import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { S3Service } from '@s3/service/s3.service';
// import { FindEmailDTO } from '@user/dto/find.email.dto';
import { FindNicknameDTO } from '@user/dto/find.nickname.dto';
import { FindPhoneDTO } from '@user/dto/find.phone.dto';
import { UpdateUserProfileDTO } from '@user/dto/update.userProfile.dto';
import { Users } from '@user/model/user.entity';
import { UserService } from '@user/service/user.service';

@ApiTags('User 관련')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
  ) {}

  /** @deprecated */
  // @Post('/check-email')
  // @ApiOperation({ summary: '이메일 중복 체크' })
  // @ApiBody({
  //   type: FindEmailDTO,
  // })
  // async findEmail(@Body() body: FindEmailDTO) {
  // return await this.userService.checkUserByEmail(body.email);
  // }

  @Post('/check-signname')
  @ApiOperation({ summary: '아이디 중복 체크' })
  @ApiBody({
    type: FindNicknameDTO,
  })
  async findSignname(@Body() body: FindNicknameDTO) {
    return await this.userService.checkUserBySignname(body.signname);
  }

  @Post('/check-phone')
  @ApiOperation({ summary: '전화번호 체크' })
  @ApiBody({
    type: FindPhoneDTO,
  })
  async findPhone(@Body() body: FindPhoneDTO) {
    return await this.userService.checkUserByPhone(body.phone);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  @ApiOperation({ summary: '유저 프로필 수정' })
  async updateProfile(
    @CurrentUser() currentUser: Users,
    @Body() body: UpdateUserProfileDTO,
  ) {
    return await this.userService.updateProfile(currentUser, body);
  }

  @Post('/test')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image) {
    console.log('images: ', image);
    // return await image;
    return await this.userService.test(image);
  }
}

// return await this.s3Service.uploadFiles(images);
