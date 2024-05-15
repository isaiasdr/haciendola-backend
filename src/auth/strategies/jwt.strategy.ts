import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { envs } from 'src/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwt_secret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;

    const user = await this.authService.findByEmail(email);

    if (!user) throw new UnauthorizedException(`Token not valid`);

    return user;
  }
}
