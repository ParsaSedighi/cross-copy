"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { tryCatch } from "@/lib/tryCatch";
import { type ActionResponse } from "@/lib/types";
import { createAuthenticatedAction } from "@/lib/safeAction";
import { type pasteZFormState, pasteSchema } from "@/lib/schemas";

export const paste = async (
  formData: pasteZFormState
): ActionResponse<{ successMessage: string }> =>
  createAuthenticatedAction(async (user) => {
    const { paste, isPublic, route } = formData;

    if (!paste || typeof paste !== "string" || paste.trim() === "") {
      return {
        data: null,
        error: { message: "Invalid text provided. Cannot save empty content." },
      };
    }

    const result = await tryCatch(
      (async () => {
        const found = await db.paste.findUnique({
          where: {
            route,
          },
        });
        if (found) {
          throw new Error(
            "This route is already in use. Please choose another."
          );
        }
        const newPaste = await db.paste.create({
          data: {
            text: paste,
            userId: user.id,
            isPublic,
            route,
          },
        });
        revalidatePath(`/u/${user.id}`);
        return newPaste;
      })()
    );

    if (result.error) {
      console.error("Failed to create paste:", result.error);
      return {
        data: result.data,
        error: {
          message: result.error.message,
        },
      };
    }
    return { data: { successMessage: "Pasted successfully!" }, error: null };
  });

export const editPaste = async (
  userId: string,
  textId: string,
  newText: string
): ActionResponse<{ successMessage: string }> =>
  createAuthenticatedAction(async (user) => {
    if (user.id !== userId) {
      return {
        data: null,
        error: {
          message: "Permission denied. You can only edit your own pastes.",
        },
      };
    }

    const result = await tryCatch(
      (async () => {
        await db.paste.update({
          where: {
            id: textId,
          },
          data: {
            text: newText,
          },
        });
        revalidatePath(`/u/${user.id}`);
      })()
    );
    if (result.error) {
      console.error("Failed to edit paste:", result.error);
      return {
        data: null,
        error: {
          message: "A database error occurred. Could not update the paste.",
        },
      };
    }
    return {
      data: { successMessage: "Paste edited successfully." },
      error: null,
    };
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

    return {
      data: { successMessage: "Paste deleted successfully." },
      error: null,
    };
  });
