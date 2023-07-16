import { AuthService } from '@auth/service/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {}

  /** 유저 프로필 변경 */
  async updateProfile(currentUser, body) {
    console.log('currentUser: ', currentUser);

    const { id: userId } = currentUser;
    const { image } = body;

    await this.authService.findUserById(userId);

    const userInfo = {
      Users: userId,
      image,
    };

    console.log('userInfo: ', userInfo);
  }
}
