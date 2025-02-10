// app/layout.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}