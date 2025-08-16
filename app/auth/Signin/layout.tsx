import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModeToggle from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex items-center bg-primary">
      <Card className="h-full w-full rounded-none lg:rounded-r-2xl flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center text-secondary-foreground">
            <ModeToggle />
            <div className="flex items-center space-x-4">
              <p className="text-sm">Don&apos;t have an account?</p>
              <Link href="/auth/Signup">
                <Button variant="outline">Sign up</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">CrossCopy</h1>
          <div className="h-7"></div>
          <p className="text-2xl text-center sm:px-24">
            Access your hub, update your pastes, and share instantly.
          </p>
          <div className="flex flex-col justify-center items-center text-2xl font-thin"></div>
          <div className="h-7"></div>
          {children}
        </CardContent>
      </Card>
      <div className="hidden md:block lg:w-9/12"></div>
    </div>
  );
}
