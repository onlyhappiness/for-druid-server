import { AuthService } from '@auth/service/auth.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserProfileDTO } from '@user/dto/update.userProfile.dto';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { uploadFiles } from 'src/utils/aws';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  /**
   * @deprecated
   * 이메일 중복 체크
   */
  // async checkUserByEmail(email: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { email },
  //   });

  //   if (user) {
  //     throw new HttpException('중복된 이메일이 있습니다.', 400);
  //   }
  //   return true;
  // }

  /** 아이디 중복 체크 */
  async checkUserBySignname(signname: string) {
    const user = await this.userRepository.findOne({
      where: { signname },
    });

    if (user) {
      throw new HttpException('이미 사용중인 아이디입니다.', 400);
    }
    return true;
  }

  /** 전화번호 중복 체크 */
  async checkUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
    });

    if (user) {
      throw new HttpException('이미 가입된 전화번호입니다.', 400);
    }
    return true;
  }

  /** 유저 프로필 변경 */
  async updateProfile(currentUser: Users, body: UpdateUserProfileDTO) {
    const { id: userId } = currentUser;
    const { image } = body;

    await this.authService.findUserById(userId);

    const profileInfo = {
      image,
    };

    const updateProfile = plainToInstance(Users, profileInfo);
    await this.userRepository.update({ id: userId }, updateProfile);

    return await this.authService.findUserById(userId);
  }

  /** test */
  async test(images) {
    return await uploadFiles(images);
  }
}
