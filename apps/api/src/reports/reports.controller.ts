import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateFloodReportDto, createFloodReportSchema } from '@repo/schemas';
import { type AuthRequest } from 'src/auth/types/auth-request.type';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UsePipes(new ZodValidationPipe(createFloodReportSchema))
  async createReport(
    @Request() req: AuthRequest,
    @Body() createFloodReportDto: CreateFloodReportDto,
  ) {
    return await this.reportsService.createReport(
      req.user.id,
      createFloodReportDto,
    );
  }
}
