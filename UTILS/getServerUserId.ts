import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export async function getServerUserId() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("SESSION:", session);

    return session?.user?.id ?? null;
  } catch (error) {
    console.error("Get user session error:", error);
    return null;
  }
}