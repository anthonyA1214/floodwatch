import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { AdminService } from './admin.service';
import { CreateAdminDto, createAdminSchema } from '@repo/schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createAdminSchema))
  async createAdmin(
    @Request() req: AuthRequest,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return await this.adminService.createAdmin(createAdminDto);
  }
}
