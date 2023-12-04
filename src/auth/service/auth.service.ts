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

  /**
   * @description
   * 사용자 id로 사용자 찾기
   * userId를 param으로 받아서 어떤 유저인지 반환합니다.
   */
  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('해당 유저는 존재하지 않습니다.', 400);
    }
    return user;
  }

  /**
   * @description
   * 사용자 이메일로 찾기
   * 이메일을 param으로 받아 이메일에 해당하는 유저를 반환합니다.
   */
  // async findUserByEmail(email: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { email },
  //     select: [
  //       'id',
  //       'name',
  //       'nickname',
  //       'email',
  //       'createdAt',
  //       'phone',
  //       'password',
  //     ],
  //   });

  //   console.log('user:', user);

  //   if (!user) {
  //     throw new HttpException('이메일을 다시 확인해주세요', 400);
  //   }
  //   return user;
  // }

  /**
   * @description
   * 사용자 핸드폰번호 찾기
   * 휴대폰번호를 param으로 받아 휴대폰번호가 맞는 유저를 반환합니다.
   */
  async findUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
      select: ['id', 'name', 'createdAt', 'phone', 'password'],
    });

    if (!user) {
      throw new HttpException('휴대폰 번호을 다시 확인해주세요', 400);
    }
    return user;
  }

  /**
   * @description
   * 회원가입
   */
  async createUser(body: UserRegisterDTO) {
    const { phone, password } = body;

    // 이메일 중복 체크
    const duplicateEmail = await this.userRepository.findOne({
      where: { phone },
    });
    if (duplicateEmail) {
      throw new UnauthorizedException('이미 사용중인 핸드폰 번호입니다.');
    }

    // 닉네임 중복 체크
    // const duplicateNickname = await this.userRepository.findOne({
    //   where: { nickname },
    // });
    // if (duplicateNickname) {
    //   throw new UnauthorizedException('이미 사용중인 닉네임입니다.');
    // }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.save({
      ...body,
      password: hashedPassword,
    });

    const { password: userPassword, ...withoutPassword } = user;

    return withoutPassword;
  }

  /** 로그인 */
  async login(body: UserLoginDTO) {
    const { phone, password } = body;

    // const user = await this.findUserByEmail(email);
    const user = await this.findUserByPhone(phone);

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

  // 로그인 유저 체크
  async loginUser(currentUser) {
    const { id: userId } = currentUser;

    const user = await this.findUserById(userId);
    return user;
  }
}
