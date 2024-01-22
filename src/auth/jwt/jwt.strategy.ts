import { AuthService } from '@auth/service/auth.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACESS_TOKEN_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: Payload) {
    const { phone } = payload;

    const user = await this.authService.findUserByPhone(phone);
    if (user) {
      return user;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
