import { UserLoginDTO } from '@auth/dto/user.login.dto';
import { UserRegisterDTO } from '@auth/dto/user.register.dto';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const user = await queryBuilder
        .where('user.id = :userId', { userId })
        .leftJoinAndSelect('user.Image', 'image')
        .getOne();

      if (!user) {
        throw new NotFoundException('해당 유저는 존재하지 않습니다.');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /** 사용자 아이디 체크 */
  async findUserBySignname(signname: string) {
    const user = await this.userRepository.findOne({
      where: { signname },
      select: ['id', 'signname', 'createdAt', 'phone', 'password'],
    });

    if (!user) {
      throw new HttpException('아이디와 비밀번호를 다시 확인해주세요', 400);
    }
    return user;
  }

  /** 사용자 핸드폰번호 체크 */
  async checkUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
    });

    if (user) {
      throw new HttpException('이미 가입된 전화번호입니다.', 400);
    }
    return user;
  }

  /** 사용자 아이디 중복체크 */
  async checkUserBySignname(signname: string) {
    const user = await this.userRepository.findOne({
      where: { signname },
    });

    if (user) {
      throw new HttpException('이미 사용중인 아이디입니다.', 400);
    }
    return user;
  }

  /** 회원가입 */
  async createUser(body: UserRegisterDTO) {
    // 소셜 로그인
    // 비밀번호 생성

    // 일반 로그인
    await this.checkUserByPhone(body.phone);
    await this.checkUserBySignname(body.signname);
    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await this.userRepository.save({
      ...body,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...withoutPassword } = user;

    return withoutPassword;
  }

  /** 로그인 */
  async login(body: UserLoginDTO) {
    const { signname, password } = body;

    // const user = await this.findUserByPhone(phone);
    const user = await this.findUserBySignname(signname);

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
