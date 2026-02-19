import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createFloodReportSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  location: z.string(),
  range: z.number(),
  description: z.string().optional(),
  image: z.string().optional(),
  severity: z.enum(['low', 'medium', 'high']),
});

export const floodReportSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  email: z.string(),
  profilePicture: z.string().optional(),
  location: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
  status: z.enum(['verified', 'unverified']),
  description: z.string().optional(),
  range: z.string().optional(),
  reportedAt: z.string(),
});

export class CreateFloodReportDto extends createZodDto(
  createFloodReportSchema,
) {}
export class FloodReportDto extends createZodDto(floodReportSchema) {}

export type FloodReportInput = z.infer<typeof floodReportSchema>;
export type CreateFloodReportInput = z.infer<typeof createFloodReportSchema>;
