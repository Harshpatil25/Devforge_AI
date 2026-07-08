import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Full name is required.'),
    username: z.string().trim().min(3, 'Username must be at least 3 characters.'),
    email: z.string().trim().email('Enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email.'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })
