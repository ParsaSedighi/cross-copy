import { GithubLoginButton } from "@/components/githubLoginButton";
import { SigninForm } from "@/components/SigninForm";

import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <GithubLoginButton className="w-full md:w-96 h-11 text-base font-light" />
        <Separator className="w-full md:w-96" />
        <SigninForm />
      </div>
    </>
  );
}
