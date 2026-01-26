import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Res,
  Headers,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  type ForgotPasswordDto,
  forgotPasswordSchema,
  logInSchema,
  type SignUpDto,
  signUpSchema,
  verifyOtpSchema,
  type VerifyOtpDto,
  resetPasswordSchema,
  type ResetPasswordDto,
} from '@repo/schemas';
import {
  type RefreshTokenRequest,
  type AuthRequest,
} from './types/auth-request.type';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { type Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { setAuthCookies } from 'src/utils/auth-util';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(logInSchema))
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, deviceId, user } =
      await this.authService.login(req.user.id, req.user.role);

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, isProduction);

    return { deviceId, user };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(
    @Headers('x-device-id') deviceId: string,
    @Request() req: RefreshTokenRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    const {
      access_token,
      refresh_token,
      deviceId: newDeviceId,
      user,
    } = await this.authService.refreshToken(
      req.user.id,
      req.user.role,
      deviceId,
      refreshToken,
    );

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, isProduction);

    return { deviceId: newDeviceId, user };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, deviceId, user } =
      await this.authService.signup(signUpDto);

    const isProduction =
      this.configService.getOrThrow('NODE_ENV') === 'production';
    setAuthCookies(res, access_token, refresh_token, isProduction);

    return { deviceId, user };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('logout')
  async logout(
    @Headers('x-device-id') deviceId: string,
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.user.id, deviceId);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'Logged out successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @UsePipes(new ZodValidationPipe(forgotPasswordSchema))
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);
    return { message: 'OTP sent to your email if it exists' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  @UsePipes(new ZodValidationPipe(verifyOtpSchema))
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { resetSessionId } = await this.authService.verifyOtp(verifyOtpDto);

    return { resetSessionId };
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
  }
}
