"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/authClient";
import { Github } from "lucide-react";

export function GithubLoginButton({ className = "" }: { className?: string }) {
  const handler = async () => {
    await authClient.signIn.social({
      provider: "github",
      newUserCallbackURL: "/",
    });
  };

  return (
    <Button className={className} variant="outline" onClick={handler}>
      <Github />
      <p className="ml-2">Continue with GitHub</p>
    </Button>
  );
}
