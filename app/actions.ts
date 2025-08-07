"use server";

import { signupSchema } from '@/lib/schemas';

export type FormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    success: boolean;
};

export async function signup(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    };

    const validatedFields = signupSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            message: 'Form submission failed. Please check the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        console.log('Signing User:', validatedFields.data);
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            message: `Thank you for signing up, ${validatedFields.data.name}!`,
            success: true,
        };

    } catch (e) {
        return {
            message: 'An unexpected error occurred. Please try again.',
            success: false,
        };
    }
}