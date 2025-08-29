import { GithubLoginButton } from "@/components/githubLoginButton";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <GithubLoginButton className="w-full md:w-96 h-11 text-base font-light" />
        <p className="font-thin">OR</p>
        <Link className="w-full flex justify-center" href="/auth/Signup/email">
          <Button className="w-full md:w-96 h-11 text-base font-light">
            Sign up with Email
          </Button>
        </Link>
      </div>
    </>
  );
}
