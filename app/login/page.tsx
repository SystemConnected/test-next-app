"use client";

import { useAuth } from "@/hooks/useAuth";
import { ApiCall } from "@/lib/utils";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ApiResponse {
  status: number;
  message: string;
  token: string;
  user: any
}

export default function LoginPage() {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      router.push("/dashboard")
    }
  }, [auth, router])

  const handleLogin = async () => {
    try {
      const response = await ApiCall<ApiResponse>('api/auth/login', { email, password });
      if (response.status === 200) {
        dispatch(loginSuccess(response));
        router.push('/dashboard');
      } else {
        alert("Login Failed")
        setError(response.message)
      }
    } catch (error) {
      setError(`${error}`);
    }
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
}
