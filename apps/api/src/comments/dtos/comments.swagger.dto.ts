import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentWithImageDto {
  @ApiProperty({
    example: 'This is a helpful comment about the flood situation',
  })
  content: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: Express.Multer.File;
}
