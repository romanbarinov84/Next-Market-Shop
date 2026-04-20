"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import GlobalLoader from "@/src/components/loading/GlobalLoader";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    verifyAccess();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking) {
      const hasAccess =
        user && (user.role === "admin" || user.role === "manager");
      if (!hasAccess) {
        router.replace("/");
      }
    }
  }, [isChecking, router, user]);

  if (isLoading || isChecking) {
    return <GlobalLoader />;
  }

  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return null;
  }

  return <>{children}</>;
}