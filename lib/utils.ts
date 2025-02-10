import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function ApiCall<T>(
  url: string,
  bodyData: Record<string, any> = {},
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST"
): Promise<T> {
  const basePath = process.env.NEXT_PUBLIC_API_URL || "";
  const fullUrl = `${basePath}${url}`;
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
}
