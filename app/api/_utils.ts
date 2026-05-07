import { NextRequest } from "next/server";
import type { AuthInput } from "../../lib/auth-service";

export async function readAuthInput(request: NextRequest): Promise<AuthInput> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return typeof body === "object" && body !== null ? body : {};
  }

  const formData = await request.formData().catch(() => new FormData());
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  };
}
