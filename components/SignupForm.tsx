"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState } from "react";

import { signupSchema, type SignupZFormState } from "@/lib/schemas";
import { signup, type SignupFormState } from "@/app/actions";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function SubmitButton({ className }: { className: string }) {
  const { pending } = useFormStatus();
  return (
    <Button className={className} type="submit" disabled={pending}>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}

export function SignupForm({ className }: { className?: string }) {
  const initialState: SignupFormState = { message: "", success: false };
  const [state, formAction] = useActionState(signup, initialState);

  const router = useRouter();

  const form = useForm<SignupZFormState>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      if (!state.success) {
        toast.error("Error", { description: state.message });
      } else {
        toast.success("Success!", { description: state.message });
        router.push("/");
      }
    }
  }, [state, form, router]);

  return (
    <form
      action={formAction}
      className={cn(className, "w-full md:w-96 space-y-4")}>
      <div>
        <Input
          className="h-11"
          placeholder="Name"
          id="name"
          {...form.register("name")}
        />
        <p className="text-sm text-red-500 mt-1">
          {form.formState.errors.name?.message || state.errors?.name?.[0]}
        </p>
      </div>

      <div>
        <Input
          className="h-11"
          placeholder="Email"
          id="email"
          {...form.register("email")}
        />
        <p className="text-sm text-red-500 mt-1">
          {form.formState.errors.email?.message || state.errors?.email?.[0]}
        </p>
      </div>
      <div>
        <Input
          className="h-11"
          placeholder="Password"
          id="password"
          type="password"
          {...form.register("password")}
        />
        <p className="text-sm text-red-500 mt-1">
          {form.formState.errors.password?.message ||
            state.errors?.password?.[0]}
        </p>
      </div>
      <div>
        <Input
          className="h-11"
          placeholder="Confirm Password"
          id="confirmPassword"
          type="password"
          {...form.register("confirmPassword")}
        />
        <p className="text-sm text-red-500 mt-1">
          {form.formState.errors.confirmPassword?.message ||
            state.errors?.confirmPassword?.[0]}
        </p>
      </div>
      <SubmitButton className="w-full h-11" />
    </form>
  );
}
