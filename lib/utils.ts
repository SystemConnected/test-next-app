import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Store securely in .env

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Get user From token
export const getUserFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
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
  const token = jwt.sign({ id: data.id, email: data.email, role: data.role, username: data.username }, SECRET_KEY, { expiresIn: "1h" });
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

// Utility functions for localStorage
export const getLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
};

export const setLocalStorageItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';').shift();
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", -1);
};