'use client'
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input"; // You can create a custom input if needed
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ApiCall } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";


interface ApiResponse {
  status: string;
  message: string;
  data: any;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  console.log(auth, "Auth in register Page")

  useEffect(() => {
    if (auth.token !== null && auth.user !== null) {
      console.log(auth, "Auth in register Page ander aaya")

      router.push("/dashboard")
    }
    console.log("Redirecting  Isme aaya ki nhi register")
  }, [auth])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = "/api/auth/register";
    const body = formData;

    try {
      const res = await ApiCall<ApiResponse>(url, { ...body });
      console.log(res);
      if (res.status !== "success") {
        setError(res.message);
        alert(res.message);
      } else {

        alert(res.message);
        router.push('/login');

      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          {"Create an account"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              className="pl-10"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-10"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pl-10 pr-10"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          {"Already have an account?"}{" "}
          <a href={"/login"} className="text-blue-600 hover:underline">
            {"Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
