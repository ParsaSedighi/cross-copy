"use server"

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";

export async function paste(text: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) return { error: "No User" }
  if (!text || typeof text !== 'string' || text.trim() === '') return { error: 'Invalid text provided.' };

  try {
    await db.paste.create({
      data: {
        text,
        userId: session.user.id,
      }
    })
    revalidatePath(`/u/${session.user.id}`)
    return { success: "Text saved successfully!" };
  } catch (err) {
    return { error: "Unexpected error occurred", err }
  }
}

export async function deletePaste(textId: string, userId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) return { error: "No User" }
  if (session.user.id !== userId) return { error: "No Permission" }

  try {
    await db.paste.delete({
      where: {
        id: textId
      }
    })
    revalidatePath(`/u/${session.user.id}`)
    return { success: "Delete successfull" }
  } catch (err) {
    return { error: "Unexpected error occurred", err }
  }
}