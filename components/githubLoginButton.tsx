"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth/authClient"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"

export function GithubLoginButton({ className = '' }: { className?: string }) {

    const handler = async () => {
        await authClient.signIn.social({
            provider: "github",
            newUserCallbackURL: '/welcome'
        })
    }

    return (
        <Button className={className} variant="outline" onClick={handler}>
            <Github />
            <p className="ml-2">
                Sign up with GitHub
            </p>
        </Button>

    )
}