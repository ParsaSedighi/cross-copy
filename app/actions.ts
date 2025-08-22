"use server";

import { signupSchema, signinSchema } from "@/lib/schemas";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export type SignupFormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    success: boolean;
};

export type SigninFormState = {
    message: string;
    errors?: {
        email?: string[];
        password?: string[];
    };
    success: boolean;
};

export async function signup(
    prevState: SignupFormState,
    formData: FormData
): Promise<SignupFormState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const validatedFields = signupSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            message: "Form submission failed. Please check the errors below fields.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        await auth.api.signUpEmail({
            body: validatedFields.data,
        });

        return {
            message: `Thank you for signing up, ${validatedFields.data.name}!`,
            success: true,
        };
    } catch (e) {
        return {
            message: "An unexpected error occurred. Please try again.",
            success: false,
        };
    }
}

export async function signin(
    prevState: SigninFormState,
    formData: FormData
): Promise<SigninFormState> {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validatedFields = signinSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            message: "Form submission failed. Please check the errors below.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        await auth.api.signInEmail({
            body: validatedFields.data,
        });

        return {
            message: `Welcome back!`,
            success: true,
        };
    } catch (e) {
        return {
            message: "An unexpected error occurred. Please try again.",
            success: false,
        };
    }
}

export async function paste(text: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) return { error: "No User" }
    if (!text || typeof text !== 'string' || text.trim() === '') return { error: 'Invalid text provided.' };

    try {
        const response = await db.paste.create({
            data: {
                text,
                userId: session.user.id,
            }
        })
        console.log('Saving to DB:', response);
    } catch (e) {
        console.error("Unexpected error occurred: ", e)
    }

    return { success: `Text saved successfully!` };
}