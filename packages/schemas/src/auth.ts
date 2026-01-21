import { z } from 'zod';

export const logInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const signUpSchema = z
  .object({
    first_name: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'First name is required',
        abort: true,
      })
      .max(50, 'First name cannot exceed 50 characters'),
    last_name: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Last name is required',
        abort: true,
      })
      .max(50, 'Last name cannot exceed 50 characters'),
    home_address: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Home address is required',
        abort: true,
      })
      .refine((val) => val.length >= 6, {
        error: 'Home address must be at least 5 characters long',
        abort: true,
      }),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .refine((val) => val.length > 0, {
        error: 'Password is required',
        abort: true,
      })
      .refine((val) => val.length >= 6, {
        error: 'Password must be at least 6 characters long',
        abort: true,
      }),
    confirm_password: z.string('Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type LogInDto = z.infer<typeof logInSchema>;
export type SignUpDto = z.infer<typeof signUpSchema>;
