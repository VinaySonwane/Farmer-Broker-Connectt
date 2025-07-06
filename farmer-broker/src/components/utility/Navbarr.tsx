"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { clearUser } from "@/store/userSlice";
import { RootState } from "@/store/store";
import { clearBrokers, clearBrokersWithRatings } from "@/store/brokerSlice";
import { IoIosHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { LogOut } from "lucide-react";

export default function HomePageNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.user);

  const handleMyAccount = () => {
    if (role === "farmer") {
      router.push("/dashboard/farmer");
    } else if (role === "broker") {
      router.push("/dashboard/broker");
    } else {
      router.push("/authentication/signIn");
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearBrokers()); //optional  Clear Broker Slice
    dispatch(clearBrokersWithRatings());
    router.push("/");
  };

  return (
    <main className="bg-gradient-to-br from-green-100 to-green-200 flex flex-col">
      <header className="sticky top-0 z-50 w-full px-6 py-4 shadow-md bg-white border-b border-green-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="FarmConnect Logo"
            />
            <h1 className="text-2xl font-extrabold text-green-700 tracking-wide">
              FarmConnect
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="space-x-5 text-sm flex items-center">
            <Link
              href="/"
              aria-label="Home"
              className={`flex items-center gap-2 text-base font-medium ${
                pathname === "/"
                  ? "text-green-700 font-bold"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              <IoIosHome size={20} /> Home
            </Link>

            <button
              aria-label="My Dashboard"
              onClick={handleMyAccount}
              className="flex items-center gap-2 text-base text-gray-600 hover:text-green-700 font-medium"
            >
              <FaUserCircle size={18} />
              Dashboard
            </button>

            {role ? (
              <button
                aria-label="Logout"
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-semibold shadow-md"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <Link
                href="/authentication/signIn"
                className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-300 font-semibold"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>
    </main>
  );
}

// "use client";

// import Image from "next/image";

// import { IoIosHome } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { clearUser } from "@/store/userSlice";
// import { RootState } from "@/store/store";
// import { LogOut } from "lucide-react";

// export default function HomePage() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { role } = useSelector((state: RootState) => state.user);

//   const handleMyAccount = () => {
//     if (role === "farmer") {
//       router.push("/dashboard/farmer");
//     } else if (role === "broker") {
//       router.push("/dashboard/broker");
//     } else {
//       router.push("/authentication/signIn");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(clearUser());
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     router.push("/");
//   };

//   return (
//     <main className="bg-gradient-to-br from-green-100 to-green-200 flex flex-col top-0">
//       <header className="w-full px-6 py-4 shadow bg-white">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center justify-center">
//             <Image
//               src="/logo.png"
//               width={50}
//               height={50}
//               alt="FarmConnect Logo"
//             />
//             <h1 className="text-2xl font-bold text-green-700">FarmConnect</h1>
//           </div>

//           <nav className="space-x-4 text-sm flex items-center">
//             <Link
//               href="/"
//               className="text-gray-600 hover:text-green-700 flex items-center gap-2 font-semibold"
//             >
//               <IoIosHome /> Home
//             </Link>

//             <button
//               onClick={handleMyAccount}
//               className="text-gray-600 hover:text-green-700 flex items-center gap-2 font-semibold"
//             >
//               <FaUserCircle />
//               MyAccount
//             </button>

//             {role ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-semibold shadow-md"
//               >
//                 <LogOut className="w-5 h-5" />
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 href="/authentication/signIn"
//                 className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-300 font-semibold"
//               >
//                 SignIn
//               </Link>
//             )}
//           </nav>
//         </div>
//       </header>
//     </main>
//   );
// }
