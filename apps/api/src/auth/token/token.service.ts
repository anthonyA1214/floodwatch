import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtRefreshConfig.KEY)
    private jwtRefreshConfiguration: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  signAccessToken(payload) {
    return this.jwtService.sign(payload);
  }

  signRefreshToken(payload) {
    return this.jwtService.sign(payload, this.jwtRefreshConfiguration);
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
