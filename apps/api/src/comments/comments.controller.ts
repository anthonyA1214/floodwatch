import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { UpdateCommentDto, updateCommentSchema } from '@repo/schemas';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req: AuthRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    await Promise.resolve();
  }
}
