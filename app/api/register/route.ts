import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "../../../lib/auth-service";
import { createSession } from "../../../lib/session";
import { readAuthInput } from "../_utils";

export async function POST(request: NextRequest) {
  const result = await registerUser(await readAuthInput(request));

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
  }

  await createSession(result.userId);
  return NextResponse.json({ ok: true }, { status: 201 });
}
