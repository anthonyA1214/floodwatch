import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  type CreateSafetyLocationInput,
  createSafetyLocationSchema,
  SafetyLocationQueryDto,
} from '@repo/schemas';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthRequest } from 'src/auth/types/auth-request.type';
import { UserStatusGuard } from 'src/common/guards/user-status/user-status.guard';
import { SafetyService } from './safety.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('safety')
export class SafetyController {
  constructor(private safetyService: SafetyService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAllPublic() {
    return await this.safetyService.findAllPublic();
  }

  @Roles('admin')
  @Get('admin')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() safetyLocationQuery: SafetyLocationQueryDto) {
    return await this.safetyService.findAll(safetyLocationQuery);
  }

  @Roles('admin')
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, UserStatusGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createSafetyLocation(
    @Request() req: AuthRequest,
    @Body() safetyLocationDto: CreateSafetyLocationInput,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const parsedData = createSafetyLocationSchema.safeParse(safetyLocationDto);

    if (!parsedData.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parsedData.error.issues,
      });
    }

    return await this.safetyService.createSafetyLocation(
      safetyLocationDto,
      image,
    );
  }
}
