import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Store securely in .env

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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const validateEmail = (email: string) => {
  return emailRegex.test(email);
}

//Generate Jwt token
export const generateToken = (data: Record<string, any>) => {
  const token = jwt.sign({ id: data.id, email: data.email }, SECRET_KEY, { expiresIn: "1h" });
  return token;
}

// Function to generate a dynamic username
export function generateUsername(email: string): string {
  // Extract the part before the '@' symbol
  const baseUsername = email.split("@")[0];

  // Remove special characters and spaces
  const cleanedUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, "");

  // Append a random 4-digit number to ensure uniqueness
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  const username = `${cleanedUsername}${randomSuffix}`;

  return username;
}