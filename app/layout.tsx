'use client';
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Provider } from "react-redux";
import store from "@/redux/store";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="antialiased bg-gray-50"> {/* Add background and other styles */}
          {/* Main layout container */}
          <div className="flex min-h-screen">
            {/* Sidebar - Add responsive visibility if needed */}
            <Sidebar />
            
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
    </Provider>
  );
}
