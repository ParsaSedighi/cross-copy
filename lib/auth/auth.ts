import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    plugins: [nextCookies()],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    },
    cors: {
        origin: ["http://localhost:3000", "https://www.crosscopy.ir"]
    },
    trustedOrigins: ["http://localhost:3000", process.env.NETWORK_TRUSTED_ORIGIN!],
});