"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { useEffect, useActionState } from 'react';

import { signupSchema, type SignupSchema } from '@/lib/schemas';
import { signup, type FormState } from '@/app/actions';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Signing Up...' : 'Sign Up'}
        </Button>
    );
}

export function SignupForm({ className }: { className?: string }) {
    const initialState: FormState = { message: '', success: false };
    const [state, formAction] = useActionState(signup, initialState);

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    });

    useEffect(() => {
        if (state.message) {
            state.success ?
                toast.success("Success!", { description: state.message })
                :
                toast.error("Error", { description: state.message })
            // Reset the form on successful submission
            if (state.success) {
                form.reset();
            }
        }
    }, [state, toast, form]);

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Sign up to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...form.register('name')} />
                        <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.name?.message || state.errors?.name?.[0]}
                        </p>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" {...form.register('email')} />
                        <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.email?.message || state.errors?.email?.[0]}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...form.register('password')} />
                        <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.password?.message || state.errors?.password?.[0]}
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
                        <p className="text-sm text-red-500 mt-1">
                            {form.formState.errors.confirmPassword?.message || state.errors?.confirmPassword?.[0]}
                        </p>
                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
