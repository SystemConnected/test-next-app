'use client'

import { ApiCall } from "@/lib/utils";
import { logoutUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface ApiResonse {
    data: any;
    status: string;
    message: string;
}

const Dashboard = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            const res = await ApiCall<ApiResonse>('/api/auth/logout', {})
            if (res.status === "success") {
                dispatch(logoutUser());
                router.push("/login")
            }else{
                alert("Logout Failed")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>DashBoard</h1>
            <button onClick={logout}>logout</button>
        </>
    )
};
export default Dashboard;