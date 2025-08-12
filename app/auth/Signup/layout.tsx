import { GithubLoginButton } from "@/components/githubLoginButton";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModeToggle from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex items-center bg-primary">
      <div className="hidden md:block lg:w-9/12"></div>
      <Card className="h-full w-full rounded-none lg:rounded-l-2xl flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center text-secondary-foreground">
            <ModeToggle />
            <div className="flex items-center space-x-4">
              <p className="text-sm">Already have an account?</p>
              <Link href="/auth/login">
                <Button variant="outline">Sign in</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">CrossCopy</h1>
          <div className="h-7"></div>
          <p className="text-2xl text-center sm:px-24">
            Share anything instantly with personal links, one-time pastes, and
            more
          </p>
          <div className="flex flex-col justify-center items-center text-2xl font-thin"></div>
          <div className="h-7"></div>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
