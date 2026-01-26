import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  ForgotPasswordDto,
  forgotPasswordSchema,
  ResetPasswordDto,
  resetPasswordSchema,
  SignUpDto,
  signUpSchema,
  VerifyOtpDto,
  verifyOtpSchema,
} from '@repo/schemas';
import jwtRefreshConfig from 'src/config/jwt-refresh.config';
import { type ConfigType } from '@nestjs/config';
import { TokenService } from './token/token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { MailerService } from 'src/mailer/mailer.service';
import Redis from 'ioredis';
import { generateOtp, hashOtp } from 'src/utils/otp-util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
    @Inject(jwtRefreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
    private mailerService: MailerService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
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

    const user = await this.usersService.findByEmail(email);
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

  async forgotPassword(forgotPasswordData: ForgotPasswordDto) {
    const parsedData = forgotPasswordSchema.parse(forgotPasswordData);
    const { email } = parsedData;

    const user = await this.usersService.findByEmail(email);
    if (!user) return;

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);

    await this.redis.set(`forgot-password-otp:${email}`, hashedOtp, 'EX', 300);
    await this.redis.set(`forgot-password-otp-attempts:${email}`, 0, 'EX', 300);

    await this.mailerService.sendOtpEmail(email, otp);

    return;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const parsedData = verifyOtpSchema.parse(verifyOtpDto);
    const { email, otp } = parsedData;

    const otpKey = `forgot-password-otp:${email}`;
    const attemptsKey = `forgot-password-otp-attempts:${email}`;

    const hashedOtp = await this.redis.get(otpKey);
    console.log(hashedOtp);
    if (!hashedOtp) {
      throw new UnauthorizedException('OTP has expired or is invalid');
    }

    const attempts = Number(await this.redis.get(attemptsKey));
    if (attempts >= 5) {
      // Max attempts exceeded, delete OTP and attempts
      await this.redis.del(otpKey, attemptsKey);
      throw new UnauthorizedException('Maximum OTP attempts exceeded');
    }

    const isValid = await bcrypt.compare(otp, hashedOtp);
    if (!isValid) {
      await this.redis.incr(attemptsKey);
      throw new UnauthorizedException('Invalid OTP');
    }

    // OTP is valid, proceed with password reset process
    await this.redis.del(otpKey, attemptsKey);

    // generate reset session id and store in redis
    const resetSessionId = randomUUID();
    await this.redis.set(`reset-session:${resetSessionId}`, email, 'EX', 600);

    return { resetSessionId };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const parsedData = resetPasswordSchema.parse(resetPasswordDto);
    const { new_password, resetSessionId } = parsedData;

    const emailKey = `reset-session:${resetSessionId}`;
    const email = await this.redis.get(emailKey);

    if (!email) {
      throw new UnauthorizedException(
        'Invalid or expired reset session. Please verify OTP again.',
      );
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await this.usersService.updatePassword(user.id, hashedPassword);

    // Invalidate the reset session
    await this.redis.del(emailKey);

    return;
  }
}
