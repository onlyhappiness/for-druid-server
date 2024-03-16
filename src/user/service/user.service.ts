import { AuthService } from '@auth/service/auth.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from '@s3/service/s3.service';
import { UpdateUserProfileDTO } from '@user/dto/update.userProfile.dto';
import { UserImage } from '@user/model/user-image.entity';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
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

  /** 유저 이미지 찾기 */
  async findImageUrl(url: string) {
    const image = await this.userImageRepository.findOne({
      where: { url: url },
    });
    return image ? image : null;
  }

  /** 이미지 hash 찾기 */
  async findImageHash(hash: string) {
    const image = await this.userImageRepository.findOne({
      where: { hash: hash },
    });

    return image ? image : null;
  }

  /** 유저 프로필 변경 */
  async updateProfile(currentUser: Users, body: UpdateUserProfileDTO) {
    const { id: userId } = currentUser;
    const { image } = body;

    const userImage = await this.findImageUrl(image);

    const profileInfo = {
      ...userImage,
      User: userId,
    };

    const updateProfile = plainToInstance(UserImage, profileInfo);
    await this.userImageRepository.update({ url: image }, updateProfile);

    return await this.authService.findUserById(userId);
  }

  async test(image) {
    // hash 추출
    const hash = crypto.createHash('sha256').update(image.buffer).digest('hex');

    const exist_image = await this.findImageHash(hash);
    if (exist_image) {
      return exist_image;
    } else {
      const url = await this.s3Service.uploadFile(image);
      const userImage = await this.userImageRepository.save({
        hash,
        url,
      });
      return userImage;
    }
  }
}
