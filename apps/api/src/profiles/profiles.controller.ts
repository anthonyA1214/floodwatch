import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request.type';

@Controller('profiles')
export class ProfilesController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
