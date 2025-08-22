"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { tryCatch } from "@/lib/tryCatch";
import { type ActionResponse } from "@/lib/types";
import { createAuthenticatedAction } from "@/lib/safeAction";

export const paste = async (
  text: string
): ActionResponse<{ successMessage: string }> =>
  createAuthenticatedAction(async (user) => {
    if (!text || typeof text !== "string" || text.trim() === "") {
      return {
        data: null,
        error: { message: "Invalid text provided. Cannot save empty content." },
      };
    }

    const result = await tryCatch(
      (async () => {
        const newPaste = await db.paste.create({
          data: {
            text,
            userId: user.id,
          },
        });
        revalidatePath(`/u/${user.id}`);
        return newPaste;
      })()
    );

    if (result.error) {
      console.error("Failed to create paste:", result.error);
      return {
        data: null,
        error: {
          message: "A database error occurred. Could not save the paste.",
        },
      };
    }

    // Success is also an explicit return of a Result object
    return { data: { successMessage: "Pasted successfully!" }, error: null };
  });

export const deletePaste = async (
  textId: string,
  userId: string
): ActionResponse<{ successMessage: string }> =>
  createAuthenticatedAction(async (user) => {
    if (user.id !== userId) {
      return {
        data: null,
        error: {
          message: "Permission denied. You can only delete your own pastes.",
        },
      };
    }

    const result = await tryCatch(
      (async () => {
        await db.paste.delete({
          where: { id: textId, userId: user.id },
        });
        revalidatePath(`/u/${user.id}`);
      })()
    );

    if (result.error) {
      console.error("Failed to delete paste:", result.error);
      return {
        data: null,
        error: {
          message: "A database error occurred. Could not delete the paste.",
        },
      };
    }

    return { data: { successMessage: "Paste deleted successfully." }, error: null };
  });