import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  SendOtpDto,
  VerifyOtpDto,
  ResetPasswordDto,
  ResendOtpDto,
} from '@repo/schemas';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() sendOtpDto: SendOtpDto) {
    await this.forgotPasswordService.forgotPassword(sendOtpDto);
    return { message: 'OTP sent to your email if it exists' };
  }

  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { resetSessionId } =
      await this.forgotPasswordService.verifyOtp(verifyOtpDto);

    return { resetSessionId };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.forgotPasswordService.resetPassword(resetPasswordDto);
  }

  @Post('resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    await this.forgotPasswordService.resendOtp(resendOtpDto);
  }
}
