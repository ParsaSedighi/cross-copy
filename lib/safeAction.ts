// In /lib/safe-action.ts or a similar file

import { auth } from "@/lib/auth/auth";
import { User } from "better-auth";
import { headers } from "next/headers";
import { type Result } from "@/lib/types";

/**
 * A higher-order function that safely wraps a server action to ensure the user is authenticated.
 * It executes the provided action, which is expected to handle its own success and error states
 * by returning a Result object.
 *
 * @template T - The type of the successful data returned by the userAction.
 * @param userAction - The action to execute. It receives the user object and must return a Result object.
 * @returns A promise that resolves to a Result object from either the authentication check or the action itself.
 */
export async function createAuthenticatedAction<T>(
  userAction: (user: User) => Promise<Result<T, { message: string }>>
): Promise<Result<T, { message: string }>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { data: null, error: { message: "Authentication required" } };
  }

  return userAction(session.user);
}