"use server"

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth/auth'
import { tryCatch } from '@/lib/tryCatch'
import { type ActionResponse } from '@/lib/types';

export async function paste(text: string): ActionResponse<{ successMessage: string }> {
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return { data: null, error: { message: 'Invalid text provided. Cannot save empty content.' } };
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { data: null, error: { message: 'Authentication required. Please sign in.' } };
  }

  const result = await tryCatch(
    (async () => {
      const newPaste = await db.paste.create({
        data: {
          text,
          userId: session.user.id,
        },
      });
      revalidatePath(`/u/${session.user.id}`);
      return newPaste;
    })()
  );

  if (result.error) {
    console.error("Failed to create paste:", result.error);
    return { data: null, error: { message: 'A database error occurred. Could not save the paste.' } };
  }

  return { data: { successMessage: 'Pasted successfully!' }, error: null };
}


export async function deletePaste(textId: string, userId: string): ActionResponse<{ successMessage: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { data: null, error: { message: 'Authentication required. Please sign in.' } };
  }
  if (session.user.id !== userId) {
    return { data: null, error: { message: 'Permission denied. You can only delete your own pastes.' } };
  }

  const result = await tryCatch(
    (async () => {
      await db.paste.delete({
        where: { id: textId, userId: session.user.id },
      });
      revalidatePath(`/u/${session.user.id}`);
    })()
  );

  if (result.error) {
    console.error("Failed to delete paste:", result.error);
    return { data: null, error: { message: 'A database error occurred. Could not delete the paste.' } };
  }

  return { data: { successMessage: 'Paste deleted successfully.' }, error: null };
}