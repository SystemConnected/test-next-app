"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";


const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const auth = useAuth();
console.log(auth,"Auth")
    useEffect(() => {
        if (!auth) {
            router.push("/login"); // Redirect if not authenticated
        }
    }, [auth, router]);

    if (!auth) return null; // Prevent flickering before redirect

    return (
        <html lang="en">
            <body className="">
                {/* Main layout container */}
                <div className="flex min-h-screen">
                    {/* Sidebar - Add responsive visibility if needed */}
                    <Sidebar  />

                    {/* Content area */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <Header />

                        {/* Main content (children pages) */}
                        <main className="flex-1 p-4">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default ProtectedLayout;
