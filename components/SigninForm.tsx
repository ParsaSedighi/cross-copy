"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useEffect, useActionState } from "react";

import { signinSchema, type SigninZFormState } from "@/lib/schemas";
import { signin, type SigninFormState } from "@/app/actions";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function SubmitButton({ className }: { className: string }) {
  const { pending } = useFormStatus();
  return (
    <Button className={className} type="submit" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function SigninForm({ className }: { className?: string }) {
  const initialState: SigninFormState = { message: "", success: false };
  const [state, formAction] = useActionState(signin, initialState);

  const form = useForm<SigninZFormState>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

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
      <SubmitButton className="w-full h-11" />
    </form>
  );
}
