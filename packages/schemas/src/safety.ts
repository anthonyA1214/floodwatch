import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createSafetyLocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  description: z.string().optional(),
  type: z.enum(['shelter', 'hospital']),
});

export const safetyLocationsSchema = z.object({
  id: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.enum(['shelter', 'hospital']),
  location: z.string(),
  address: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.string(),
});

export class CreateSafetyLocationDto extends createZodDto(
  createSafetyLocationSchema,
) {}
export class SafetyLocationsDto extends createZodDto(safetyLocationsSchema) {}

export type CreateSafetyLocationInput = z.infer<
  typeof createSafetyLocationSchema
>;
export type SafetyLocationsInput = z.infer<typeof safetyLocationsSchema>;
