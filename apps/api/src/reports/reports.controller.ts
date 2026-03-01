import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import {
  CreateCommentDto,
  CreateFloodAlertDto,
  createFloodAlertSchema,
  ReportFloodAlertDto,
  reportFloodAlertSchema,
  ReportQueryDto,
} from '@repo/schemas';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentsService } from 'src/comments/comments.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  CreateFloodAlertWithImageDto,
  ReportFloodAlertWithImageDto,
} from './dtos/reports.swagger.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private commentsService: CommentsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPublic() {
    return await this.reportsService.findAllPublic();
  }

  @Get('admin')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() reportQuery: ReportQueryDto) {
    return await this.reportsService.findAll(reportQuery);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
      fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ReportFloodAlertWithImageDto })
  async createReport(
    @Request() req: AuthRequest,
    @Body() createFloodAlertDto: ReportFloodAlertDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsed = reportFloodAlertSchema.safeParse(createFloodAlertDto);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsed.error.issues,
      });
    }

    return await this.reportsService.createReport(
      req.user.id,
      createFloodAlertDto,
      image,
    );
  }

  @Post('admin/create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
      fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFloodAlertWithImageDto })
  async createReportAdmin(
    @Request() req: AuthRequest,
    @Body() createFloodAlertDto: CreateFloodAlertDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsed = createFloodAlertSchema.safeParse(createFloodAlertDto);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsed.error.issues,
      });
    }

    return await this.reportsService.createReportAdmin(
      req.user.id,
      createFloodAlertDto,
      image,
    );
  }

  @Patch(':id/verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  async verifyReportStatus(@Param('id') id: string) {
    return await this.reportsService.verifyReportStatus(id);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  async deleteReport(@Param('id') id: string) {
    return await this.reportsService.deleteReport(id);
  }

  @Get(':id/comments')
  @HttpCode(HttpStatus.OK)
  async getComments(@Param('id') id: string) {
    return await this.commentsService.getComments(id);
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: AuthRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.commentsService.addComment(
      id,
      createCommentDto,
      req.user.id,
      image,
    );
  }
}
