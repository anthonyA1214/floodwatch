import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, signUpSchema } from '@repo/schemas';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { type ConfigType } from '@nestjs/config';
import { TokenService } from './token/token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
    @Inject(jwtRefreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new ForbiddenException();

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) throw new UnauthorizedException();

    const { hashedPassword: _hashedPassword, ...result } = user;

    return result;
  }

  async login(userId: number, role: string) {
    const payload: JwtPayload = { sub: userId, role };

    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    // hash refresh token to be inserted to db
    const hashedToken = await bcrypt.hash(refresh_token, 10);

    // random uuid for deviceId, unique only to that device
    const deviceId = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.setRefreshToken(
      userId,
      deviceId,
      hashedToken,
      expiresAt,
    );

    const user = await this.usersService.findByIdWithProfile(userId);

    return { access_token, refresh_token, deviceId, user };
  }

  async refreshToken(
    userId: number,
    role: string,
    deviceId: string,
    rawToken: string,
  ) {
    // validate refresh token
    const isValid = await this.refreshTokenService.validateRefreshToken(
      userId,
      deviceId,
      rawToken,
    );

    if (!isValid) throw new UnauthorizedException('Invalid refresh token');

    const payload: JwtPayload = { sub: userId, role };

    // signing tokens
    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    const hashedToken = await bcrypt.hash(refresh_token, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // rotate refresh token
    await this.refreshTokenService.setRefreshToken(
      userId,
      deviceId,
      hashedToken,
      expiresAt,
    );

    const user = await this.usersService.findByIdWithProfile(userId);

    return { access_token, refresh_token, deviceId, user };
  }

  async signup(signUpData: SignUpDto) {
    const parsedData = signUpSchema.parse(signUpData);
    const { email, password, first_name, last_name, home_address } = parsedData;

    const user = await this.usersService.findOne(email);
    if (user) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser(
      email,
      hashedPassword,
      first_name,
      last_name,
      home_address,
    );

    const payload: JwtPayload = {
      sub: newUser.id,
      role: newUser.role,
    };

    const access_token = this.tokenService.signAccessToken(payload);
    const refresh_token = this.tokenService.signRefreshToken(payload);

    const hashedToken = await bcrypt.hash(refresh_token, 10);

    const deviceId = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenService.setRefreshToken(
      newUser.id,
      deviceId,
      hashedToken,
      expiresAt,
    );

    return { access_token, refresh_token, deviceId, user: newUser };
  }

  async logout(userId: number, deviceId: string) {
    await this.refreshTokenService.removeRefreshToken(userId, deviceId);
  }
}
