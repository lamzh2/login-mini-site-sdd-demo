import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/session";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ ok: false, message: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      name: user.name,
      email: user.email
    }
  });
}
