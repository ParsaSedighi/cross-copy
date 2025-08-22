"use server";

import { SignupZFormState, SigninZFormState } from "@/lib/schemas";
import { auth } from "@/lib/auth/auth";
import { ActionResponse } from "@/lib/types";
import { tryCatch } from "@/lib/tryCatch";


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
    data: SignupZFormState
): ActionResponse<{ message: string }> {

    const result = await tryCatch(
        auth.api.signUpEmail({ body: data })
    );

    if (result.error) {
        return {
            data: null,
            error: { message: "Signup failed. An unexpected error occurred." },
        };
    }

    return {
        data: { message: `Thank you for signing up, ${data.name}!` },
        error: null,
    };
}

export async function signin(
    data: SigninZFormState
): ActionResponse<{ message: string }> {

    const result = await tryCatch(
        auth.api.signInEmail({ body: data })
    );

    if (result.error) {
        return {
            data: null,
            error: { message: "Sign in failed. Please check your email and password." },
        };
    }

    return {
        data: { message: "Welcome back!" },
        error: null,
    };
}