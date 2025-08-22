import { auth } from "@/lib/auth/auth";
import { User } from "better-auth";
import { headers } from "next/headers";

/**
 * A higher-order function that wraps a server action to ensure the user is authenticated.
 * It retrieves the current user session. If a valid session and user exist, it executes
 * the provided action by passing the user object to it. If not, it throws an error.
 * This utility is designed to reduce boilerplate authentication checks in server actions.
 *
 * @param {function(import("better-auth").User): Promise<T>} userAction - The callback function to execute
 * if the user is authenticated. It receives the full `user` object and should return a promise.
 *
 * @returns {Promise<T>} A promise that resolves with the return value of the `userAction`.
 *
 * @throws {Error} Throws an "Authentication required" error if no active session is found
 * or the user is not authenticated.
 *
 * @example
 * // In your actions file (e.g., /app/actions.ts)
 * import { createAuthenticatedAction } from '@/lib/safeAction';
 *
 * export const deleteItem = async (itemId: string) =>
 * createAuthenticatedAction(async (user) => {
 * // Inside this block, 'user' is guaranteed to be defined.
 * console.log(`Item ${itemId} is being deleted by user: ${user.name}`);
 *
 * if (user.role !== 'admin') {
 * throw new Error('Permission denied: Admin role required.');
 * }
 *
 * // ...database logic to delete the item...
 *
 * return { success: true, deletedItemId: itemId };
 * });
 */
export async function createAuthenticatedAction<T>(
  userAction: (user: User) => Promise<T>
) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user?.id) {
    throw new Error("Authentication required: Please sign in.");
  }

  return userAction(session.user);
}