import { z } from 'zod';

export const signupSchema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .refine((val) => /[A-Z]/.test(val), { message: "Must include an uppercase letter" })
        .refine((val) => /[a-z]/.test(val), { message: "Must include a lowercase letter" })
        .refine((val) => /[0-9]/.test(val), { message: "Must include a number" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type SignupSchema = z.infer<typeof signupSchema>;