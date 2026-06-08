import {
  getBetterAuthSession,
  getCustomSessionToken,
  getUserById,
  getValidCustomSession,
} from "@/UTILS/auth-helpers";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 🔹 1. Better Auth
    const betterAuthSession = await getBetterAuthSession(request.headers);

    if (betterAuthSession?.user?.id) {
      const userData = await getUserById(betterAuthSession.user.id);

      if (userData) {
        return NextResponse.json(userData);
      }
    }

    // 🔹 2. Custom session (safe cookie handling)
    const cookieHeader = request.headers.get("cookie") ?? "";
    const sessionToken = getCustomSessionToken(cookieHeader);

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    const session = await getValidCustomSession(sessionToken);

    if (!session?.userId) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }

    // 🔹 3. Get user
    const userData = await getUserById(session.userId);

    if (!userData) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in user API:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}