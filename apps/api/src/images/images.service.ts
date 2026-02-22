import { BadRequestException, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { fromBuffer } from 'file-type';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

@Injectable()
export class ImagesService {
  async detectMimeType(buffer: Buffer): Promise<string | null> {
    const fileType = await fromBuffer(buffer);
    if (!fileType || !ACCEPTED_IMAGE_TYPES.includes(fileType.mime)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed.',
      );
    }

    return fileType.mime;
  }

  async normalizeAvatarImage(
    buffer: Buffer,
    size: number = 256,
  ): Promise<{ buffer: Buffer; mimetype: string }> {
    try {
      const normalizedBuffer = await sharp(buffer)
        .resize(size, size, { fit: 'cover', position: 'center' })
        .rotate()
        .webp({ quality: 85, effort: 4 })
        .toBuffer();

      return {
        buffer: normalizedBuffer,
        mimetype: 'image/webp',
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }

  async normalizeImage(
    buffer: Buffer,
  ): Promise<{ buffer: Buffer; mimetype: string }> {
    try {
      const normalizedBuffer = await sharp(buffer)
        .rotate()
        .webp({ quality: 85, effort: 4 })
        .toBuffer();

      return {
        buffer: normalizedBuffer,
        mimetype: 'image/webp',
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }
}
