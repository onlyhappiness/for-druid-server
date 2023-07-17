import { AuthService } from '@auth/service/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserProfileDTO } from '@user/dto/update.userProfile.dto';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

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
}
