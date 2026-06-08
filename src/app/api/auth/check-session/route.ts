import { getBetterAuthSession, getCustomSessionToken, validateCustomSession } from "@/UTILS/auth-helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const betterAuthSession = await getBetterAuthSession(request.headers);

    if (betterAuthSession?.user?.id) {
      return NextResponse.json({ isAuth: true });
    }

    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionToken = getCustomSessionToken(cookieHeader);

    if (!sessionToken) {
      return NextResponse.json({ isAuth: false });
    }

    const isAuth = await validateCustomSession(sessionToken);

    return NextResponse.json({ isAuth: !!isAuth });
  } catch (error) {
    console.error("Error in check-session:", error);
    return NextResponse.json({ isAuth: false });
  }
}