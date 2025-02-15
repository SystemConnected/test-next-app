import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input"; // You can create a custom input if needed
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ApiCall } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

interface AuthFormProps {
    type: "login" | "register";
}
interface ApiResponse {
    status: string;
    message: string;
    data: any;
}

export default function AuthForm({ type }: AuthFormProps) {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const url = type === "login" ? "/api/auth/login" : "/api/auth/register";
        const body = type === "login" ? { email: formData.email, password: formData.password } : formData;

        try {
            const res = await ApiCall<ApiResponse>(url, { ...body });
            console.log(res);
            if (res.status !== "success") {
                setError(res.message);
                alert(res.message);
            } else {
                if (type === "login") {
                  dispatch(loginSuccess(res.data));
                     router.push('/dashboard');
                } else {
                    alert(res.message);
                     router.push('/login');
                }
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
                    {type === "login" ? "Login to your account" : "Create an account"}
                </h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "register" && (
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
                    )}
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
                        {loading ? "Processing..." : type === "login" ? "Login" : "Register"}
                    </Button>
                </form>
                <p className="text-sm text-center mt-4">
                    {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <a href={type === "login" ? "/register" : "/login"} className="text-blue-600 hover:underline">
                        {type === "login" ? "Sign up" : "Login"}
                    </a>
                </p>
            </div>
        </div>
    );
}
