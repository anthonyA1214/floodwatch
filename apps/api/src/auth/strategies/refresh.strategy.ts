import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ValidatedUser } from '../interfaces/validated-user.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtRefreshConfig.KEY)
    private jwtRefreshConfiguration: ConfigType<typeof jwtRefreshConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.cookies?.refresh_token as string | undefined;
          return token ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtRefreshConfiguration.secret as string,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): ValidatedUser {
    const token = req.cookies?.refresh_token as string | undefined;

    return {
      id: payload.sub,
      refresh_token: token,
    };
  }
}
