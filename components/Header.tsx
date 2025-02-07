'use client'
import { setIsopenSidebar } from "@/redux/slices/layoutSlice";
import { RootState } from "@/redux/store";
import { Menu } from "lucide-react"; // for icons Libarary
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
    const  dispatch =useDispatch();
    const isOpenSidebar = useSelector((state:RootState)=>state.layout.isOpenSidebar)
    console.log(isOpenSidebar,"aaya ki nahi")
    return (
        <header>
            <div className="border-black border"   >
               <div onClick={()=> dispatch(setIsopenSidebar(!isOpenSidebar))}>

                <Menu />
               </div>
            </div>

        </header>
    )
}
