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
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { logInSchema, type SignUpDto, signUpSchema } from '@repo/schemas';
import {
  type RefreshTokenRequest,
  type AuthRequest,
} from './types/auth-request.type';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { type Response } from 'express';
import { ConfigService } from '@nestjs/config';

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

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { deviceId, user };
  }

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

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { deviceId: newDeviceId, user };
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, deviceId, user } =
      await this.authService.signup(signUpDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { deviceId, user };
  }
}
