import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z
    .string({ required_error: 'Name field is required' })
    .nonempty({ message: 'Name field can not be empty' })
    .max(255),
  email: z
    .string({
      required_error: 'Email field is required'
    })
    .email({ message: 'Email field must be a valid email' }),
  password: z
    .string({
      required_error: 'Password field is required'
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(255)
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
