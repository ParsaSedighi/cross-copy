"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function EmailSignupButton({ className }: { className?: string }) {

    const router = useRouter();

    const handler = () => {
        router.push('/auth/Signup-email')
    }

    return (
        <Button className={className} onClick={handler}>
            Sign up with Email
        </Button>
    )
}