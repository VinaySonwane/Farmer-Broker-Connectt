"use client";

import { useRouter } from "next/navigation";
import { IoIosHome } from "react-icons/io";
import { LogOut } from "lucide-react";

import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { clearBrokers, clearBrokersWithRatings } from "@/store/brokerSlice";

export default function DashboardNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
    dispatch(clearBrokers()); //optional  Clear Broker Slice
    dispatch(clearBrokersWithRatings());

    router.push("/authentication/signIn");
  };
  //   bg-green-100
  //<nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-6 py-4 bg-[#3C6E47] border-b border-green-300 shadow-sm">
  //<nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4  bg-[#3C6E47] border-b border-green-300 shadow-sm">

  return (
    <nav className="sticky top-0 z-50 h-16 flex justify-between items-center px-6 py-4 bg-[#3C6E47] border-b border-green-300 shadow-sm">
      <button
        className="flex items-center gap-2  hover:text-green-700 font-semibold transition bg-black px-5 py-3 rounded-full"
        onClick={() => router.push("/")}
      >
        <IoIosHome className="text-2xl" />
        <span className="text-lg ">Home</span>
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white hover:bg-red-400 transition font-semibold shadow-md"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </nav>
  );
}
