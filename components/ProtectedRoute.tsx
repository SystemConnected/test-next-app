"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { protectedRoutes } from "@/config/protectedRoutes";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && protectedRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [user, pathname, router]);

  if (!user && protectedRoutes.includes(pathname)) return null; // Prevent flicker before redirect

  return <>{children}</>;
};

export default ProtectedRoute;