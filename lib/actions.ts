"use server";

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { hashPassword, verifyPassword } from "./password";
import { clearSession, createSession } from "./session";
import { loginSchema, registerSchema } from "./validation";

export type ActionState = {
  message: string;
};

const genericLoginError = "Email or password is incorrect.";

export async function registerAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { message: parsed.error.issues[0]?.message ?? "Registration input is invalid." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true }
  });

  if (existingUser) {
    return { message: "Could not create account with those details." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password)
    },
    select: { id: true }
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { message: genericLoginError };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, passwordHash: true }
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { message: genericLoginError };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
