import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().trim().optional(),
});

export class CreateCommentDto extends createZodDto(createCommentSchema) {}

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
