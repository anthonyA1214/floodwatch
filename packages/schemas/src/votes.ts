import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const voteSchema = z.object({
  action: z.enum(['confirm', 'deny']),
});

export const voteResponseSchema = z.object({
  message: z.string(),
  userVote: z.enum(['confirm', 'deny']).nullable(),
});

export class VoteDto extends createZodDto(voteSchema) {}

export type VoteInput = z.infer<typeof voteSchema>;
export type VoteResponse = z.infer<typeof voteResponseSchema>;
