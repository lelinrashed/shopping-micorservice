import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email field is required'
    })
    .email({
      message: 'Email field must be a valid email'
    }),
  password: z
    .string({
      required_error: 'Password field is required'
    })
    .min(6, {
      message: 'Password must be at least 6 characters long'
    })
    .max(255)
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
