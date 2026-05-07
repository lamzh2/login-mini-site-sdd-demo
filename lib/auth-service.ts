import { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { hashPassword, verifyPassword } from "./password";
import { loginSchema, registerSchema } from "./validation";

export type AuthInput = Record<string, FormDataEntryValue | string | null | undefined>;

type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; message: string; status: number };

export const genericLoginError = "Email or password is incorrect.";

export async function registerUser(input: AuthInput): Promise<AuthResult> {
  const parsed = registerSchema.safeParse({
    name: input.name,
    email: input.email,
    password: input.password
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Registration input is invalid.",
      status: 400
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true }
  });

  if (existingUser) {
    return { ok: false, message: "Could not create account with those details.", status: 409 };
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash: await hashPassword(parsed.data.password)
      },
      select: { id: true }
    });

    return { ok: true, userId: user.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, message: "Could not create account with those details.", status: 409 };
    }

    throw error;
  }
}

export async function loginUser(input: AuthInput): Promise<AuthResult> {
  const parsed = loginSchema.safeParse({
    email: input.email,
    password: input.password
  });

  if (!parsed.success) {
    return { ok: false, message: genericLoginError, status: 401 };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, passwordHash: true }
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, message: genericLoginError, status: 401 };
  }

  return { ok: true, userId: user.id };
}
