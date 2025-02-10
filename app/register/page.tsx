"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ApiCall } from "@/lib/utils";
import { loginSuccess } from "@/redux/slices/authSlice";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const response = await ApiCall<{ status: number; token: string; user: any,message:string }>(
        "/api/auth/register",
        { name, email, password }
      );

      if (response.status===201) {
        dispatch(loginSuccess(response));
        router.push("/dashboard"); // Redirect to dashboard after signup
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
