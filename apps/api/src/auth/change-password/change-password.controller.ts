import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VerifyOtpSecureDto, ChangePasswordDto } from '@repo/schemas';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ChangePasswordService } from './change-password.service';
import { type AuthRequest } from '../types/auth-request.type';

@UseGuards(JwtAuthGuard)
@Controller('auth/change-password')
export class ChangePasswordController {
  constructor(private changePasswordService: ChangePasswordService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Request() req: AuthRequest) {
    await this.changePasswordService.sendOtp(req.user.email);
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Request() req: AuthRequest,
    @Body() verifyOtpSecureDto: VerifyOtpSecureDto,
  ) {
    const { resetSessionId } = await this.changePasswordService.verifyOtp(
      req.user.email,
      verifyOtpSecureDto,
    );

    return { resetSessionId };
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    await this.changePasswordService.changePassword(changePasswordDto);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Request() req: AuthRequest) {
    await this.changePasswordService.resendOtp(req.user.email);
  }
}
