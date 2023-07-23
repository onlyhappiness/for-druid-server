import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Payload } from './jwt.payload';
import { AuthService } from '@auth/service/auth.service';

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
    const { email, phone } = payload;
    // const user = await this.authService.findUserByEmail(email);
    const user = await this.authService.findUserByPhone(phone);
    if (user) {
      return user;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
