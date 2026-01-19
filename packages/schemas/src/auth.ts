import { z } from 'zod';

export const logInSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
  home_address: z.string(),
  email: z.email(),
  password: z.string().min(1),
});

export type LogInDto = z.infer<typeof logInSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
