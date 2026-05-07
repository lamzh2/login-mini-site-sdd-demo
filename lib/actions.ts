"use server";

import { redirect } from "next/navigation";
import { genericLoginError, loginUser, registerUser } from "./auth-service";
import { clearSession, createSession } from "./session";

export type ActionState = {
  message: string;
};

export async function registerAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const result = await registerUser({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!result.ok) {
    return { message: result.message };
  }

  await createSession(result.userId);
  redirect("/dashboard");
}

export async function loginAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const result = await loginUser({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!result.ok) {
    return { message: genericLoginError };
  }

  await createSession(result.userId);
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
