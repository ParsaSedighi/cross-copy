"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signinSchema, type SigninZFormState } from "@/lib/schemas";
import { signin } from "@/app/(actions)/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function SubmitButton({
  isPending,
  className,
}: {
  isPending: boolean;
  className?: string;
}) {
  return (
    <Button className={className} type="submit" disabled={isPending}>
      {isPending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

export function SigninForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SigninZFormState>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninZFormState) => {
    startTransition(async () => {
      const result = await signin(data);

      if (result.error) {
        toast.error("Error", { description: result.error.message });
      } else {
        toast.success("Success!", { description: result.data.message });
        router.push("/");
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(className, "w-full md:w-96 space-y-4")}>
      <div>
        <Input
          className="h-11"
          placeholder="Email"
          id="email"
          {...form.register("email")}
        />
        <p className="text-sm text-red-500 mt-1">
          {form.formState.errors.email?.message}
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
          {form.formState.errors.password?.message}
        </p>
      </div>
      <SubmitButton isPending={isPending} className="w-full h-11" />
    </form>
  );
}
