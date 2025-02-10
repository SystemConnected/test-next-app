'use client'

import { ApiCall } from "@/lib/utils";
import { logoutUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface ApiResonse {
    data: any;
    status: number;
    message: string;
}

const Dashboard = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await ApiCall<ApiResonse>('/api/auth/logout', {})
            dispatch(logoutUser());
            router.push("/login")
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