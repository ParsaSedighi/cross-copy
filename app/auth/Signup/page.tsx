import { GithubLoginButton } from "@/components/githubLoginButton"
import { EmailSignupButton } from "@/components/emailSignupButton"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import ModeToggle from "@/components/modeToggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignupPage() {
    return (
        <div className="h-screen flex items-center bg-primary">
            <div className="hidden md:block lg:w-9/12">
            </div>
            <Card className="h-full w-full rounded-none lg:rounded-l-2xl flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-center text-secondary-foreground">
                        <ModeToggle />
                        <p>
                            Already have an account?
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">CrossCopy</h1>
                    <div className="h-7"></div>
                    <p className="text-2xl text-center sm:px-24">
                        Share anything instantly with personal links, one-time pastes, and more
                    </p>
                    <div className="flex flex-col justify-center items-center text-2xl font-thin">
                    </div>
                    <div className="h-7"></div>
                    <div className="flex flex-col justify-center items-center space-y-4 w-full">
                        <GithubLoginButton className="w-full md:w-96 h-11 text-base font-light" />
                        <p className="font-thin">OR</p>
                        <Link href="/auth/Signup-email">
                            <Button className="w-full md:w-96 h-11 text-base font-light">
                                Sign up with Email
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}