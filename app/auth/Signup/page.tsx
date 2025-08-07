import { GithubLoginButton } from "@/components/githubLoginButton"
import { EmailSignupButton } from "@/components/emailSignupButton"

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

export default function SignupPage() {
    return (
        <div className="h-screen flex items-center bg-primary">
            <div className="hidden md:block md:w-full">
            </div>
            <Card className="h-full w-full md:px-24 rounded-none md:rounded-l-2xl">
                <CardContent className="h-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">CrossCopy</h1>
                    <div className="h-7"></div>
                    <p className="text-2xl text-center">
                        Share anything instantly with personal links, one-time pastes, and more
                    </p>
                    <div className="flex flex-col justify-center items-center text-2xl font-thin">
                    </div>
                    <div className="h-7"></div>
                    <div className="flex flex-col justify-center items-center space-y-4 w-full">
                        <GithubLoginButton className="w-full md:w-96 h-11 text-base font-light" />
                        <p className="font-thin">OR</p>
                        <EmailSignupButton className="w-full md:w-96 h-11 text-base font-light" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}