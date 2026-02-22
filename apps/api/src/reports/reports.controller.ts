import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import {
  type ReportFloodAlertInput,
  reportFloodAlertSchema,
} from '@repo/schemas';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('')
  async findAll() {
    return await this.reportsService.findAll();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createReport(
    @Request() req: AuthRequest,
    @Body() createFloodReportDto: ReportFloodAlertInput,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsedData = reportFloodAlertSchema.safeParse(createFloodReportDto);
    if (!parsedData.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsedData.error.issues,
      });
    }

    return await this.reportsService.createReport(
      req.user.id,
      createFloodReportDto,
      image,
    );
  }
}
