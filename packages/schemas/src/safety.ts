import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createSafetyLocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  locationName: z.string(),
  address: z.string(),
  description: z.string().optional(),
  type: z.enum(['shelter', 'hospital']),
});

export const safetyMapPinSchema = z.object({
  id: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.enum(['shelter', 'hospital']),
});

export const safetyDetailSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.enum(['shelter', 'hospital']),
  location: z.string(),
  address: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
});

export const safetyLocationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  type: z.enum(['shelter', 'hospital']).optional(),
  q: z.string().optional(),
});

export class CreateSafetyLocationDto extends createZodDto(
  createSafetyLocationSchema,
) {}
export class safetyMapPinDto extends createZodDto(safetyMapPinSchema) {}
export class safetyDetailDto extends createZodDto(safetyDetailSchema) {}
export class SafetyLocationQueryDto extends createZodDto(
  safetyLocationQuerySchema,
) {}

export type CreateSafetyLocationInput = z.infer<
  typeof createSafetyLocationSchema
>;
export type SafetyMapPinInput = z.infer<typeof safetyMapPinSchema>;
export type SafetyDetailInput = z.infer<typeof safetyDetailSchema>;
export type SafetyLocationQueryInput = z.infer<
  typeof safetyLocationQuerySchema
>;
