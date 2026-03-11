import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { generateCsrfToken } from './csrf';
import { type Request, type Response } from 'express';

@Controller()
export class AppController {
  @Public()
  @Get('csrf-token')
  @HttpCode(HttpStatus.OK)
  getCsrfToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = generateCsrfToken(req, res);
    return { csrfToken: token };
  }
}
