import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { logInSchema, type SignUpDto, signUpSchema } from '@repo/schemas';
import {
  type RefreshTokenRequest,
  type AuthRequest,
} from './types/auth-request.type';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
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
    const { access_token, refresh_token, deviceId } =
      await this.authService.login(req.user.id);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { access_token, deviceId };
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  refreshToken(
    @Body('deviceId') deviceId: string,
    @Request() req: RefreshTokenRequest,
  ) {
    return this.authService.refreshToken(
      req.user.id,
      deviceId,
      req.user.rawToken,
    );
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
