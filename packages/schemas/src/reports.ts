import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const reportFloodAlertSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  range: z.coerce.number(),
  description: z.string().optional(),
  severity: z.enum(['low', 'moderate', 'high', 'critical']),
});

export const floodReportsSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  email: z.string(),
  profilePicture: z.string().optional(),
  severity: z.enum(['low', 'moderate', 'high', 'critical']),
  status: z.enum(['verified', 'unverified']),
  description: z.string().optional(),
  range: z.number(),
  longitude: z.number(),
  latitude: z.number(),
  location: z.string(),
  image: z.string().optional(),
  reportedAt: z.string(),
});

export class ReportFloodAlertDto extends createZodDto(reportFloodAlertSchema) {}
export class FloodReportsDto extends createZodDto(floodReportsSchema) {}

export type FloodReportsInput = z.infer<typeof floodReportsSchema>;
export type ReportFloodAlertInput = z.infer<typeof reportFloodAlertSchema>;
