import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().trim().optional(),
});

export const updateCommentSchema = z.object({
  content: z.string().trim().optional(),
  removeImage: z.boolean().optional(),
});

export class CreateCommentDto extends createZodDto(createCommentSchema) {}
export class UpdateCommentDto extends createZodDto(updateCommentSchema) {}

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
