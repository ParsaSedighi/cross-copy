import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Name must be at least 2 characters long." }),
    email: z
      .string()
      .trim()
      .pipe(z.email({ error: "Please enter a valid email address." })),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include an uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include a lowercase letter",
      })
      .refine((val) => /[0-9]/.test(val), { message: "Must include a number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Please enter a valid email address." })),
  password: z.string().nonempty({ error: "Password is required." }),
});

export const pasteSchema = z.object({
  paste: z.string().trim().nonempty({ message: "Your text cannot be empty." }),
  isPublic: z.boolean(),
  route: z
    .string()
    .trim()
    .refine(
      (val) =>
        !val ||
        (val.length >= 3 && val.length <= 16 && /^[a-z0-9-]+$/.test(val)),
      {
        message:
          "Route must be 3-16 chars, only lowercase letters, numbers, and hyphens.",
      }
    ),
});

export type SignupZFormState = z.infer<typeof signupSchema>;
export type SigninZFormState = z.infer<typeof signinSchema>;
export type pasteZFormState = z.infer<typeof pasteSchema>;
