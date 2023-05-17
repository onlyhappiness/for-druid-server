import { UserLoginDTO } from '@auth/dto/user.login.dto';
import { UserRegisterDTO } from '@auth/dto/user.register.dto';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  //** 사용자 id로 사용자 찾기  */
  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('해당 유저는 존재하지 않습니다.', 400);
    }
    return user;
  }

  //** 사용자 이메일로 찾기 */
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('이메일을 다시 확인해주세요', 400);
    }
    return user;
  }

  //** 회원가입 */
  async createUser(body: UserRegisterDTO) {
    const { email, nickname, password } = body;

    // 이메일 중복 체크
    const duplicateEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (duplicateEmail) {
      throw new UnauthorizedException('이미 사용중인 이메일입니다.');
    }

    // 닉네임 중복 체크
    const duplicateNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (duplicateNickname) {
      throw new UnauthorizedException('이미 사용중인 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.save({
      ...body,
      password: hashedPassword,
    });

    const { password: userPassword, ...withoutPassword } = user;

    return withoutPassword;
  }

  //** 로그인 */
  async login(body: UserLoginDTO) {
    const { email, password } = body;

    const user = await this.findUserByEmail(email);

    const isPasswordValidated = await bcrypt.compare(password, user.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 다시 확인해주세요.');
    }

    const access_token = this.jwtService.sign(body, {
      secret: process.env.JWT_ACESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return { access_token };
  }
}
