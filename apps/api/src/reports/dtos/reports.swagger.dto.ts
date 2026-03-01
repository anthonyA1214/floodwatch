import { ApiProperty } from '@nestjs/swagger';

export class ReportFloodAlertWithImageDto {
  @ApiProperty({ example: 14.5995 })
  latitude: number;

  @ApiProperty({ example: 120.9842 })
  longitude: number;

  @ApiProperty({ example: 100 })
  range: number;

  @ApiProperty({ enum: ['low', 'moderate', 'high', 'critical'] })
  severity: 'low' | 'moderate' | 'high' | 'critical';

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;
}

export class CreateFloodAlertWithImageDto {
  @ApiProperty({ example: 'Caloocan City' })
  locationName: string;

  @ApiProperty({ example: 14.5995 })
  latitude: number;

  @ApiProperty({ example: 120.9842 })
  longitude: number;

  @ApiProperty({ example: 100 })
  range: number;

  @ApiProperty({ enum: ['low', 'moderate', 'high', 'critical'] })
  severity: 'low' | 'moderate' | 'high' | 'critical';

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;
}
