'use client'
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input"; // You can create a custom input if needed
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock, } from "lucide-react";
import { ApiCall } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";


interface ApiResponse {
  status: string;
  message: string;
  token: string;
  user: any;
}

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useAuth();

  console.log(auth, "Auth in login Page")
  useEffect(() => {
    if (auth.token !== null && auth.user !== null) {
      console.log("Redirecting to dashboard Isme aaya ki nhi")
      router.push("/dashboard")
    }
    console.log("Redirecting  Isme aaya ki nhi")

  }, [auth])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = "/api/auth/login"
    const body = formData;

    try {
      const res = await ApiCall<ApiResponse>(url, { ...body });
      if (res.status !== "success") {
        setError(res.message);
        alert(res.message);
      } else {
        dispatch(loginSuccess({ token: res.token, user: res.user }));
        router.push('/dashboard');

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
          Login to your account
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">

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
            {loading ? "Processing..." : "Login"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          {"Don't have an account? "}{" "}
          <a href={"/register"} className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
