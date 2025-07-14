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
import { Menu, X } from "lucide-react"; // X for close icon
import { useState } from "react";

export default function HomePageNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.user);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

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
    dispatch(clearBrokers());
    dispatch(clearBrokersWithRatings());
    router.push("/");
  };

  return (
    <main className="bg-gradient-to-br from-green-100 to-green-200 flex flex-col">
      <header className="sticky top-0 z-50 w-full px-4 py-3 shadow-md bg-white border-b border-green-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <Image src="/logo.png" width={40} height={40} alt="Logo" />
            <h1 className="text-xl font-extrabold text-green-700 tracking-wide">
              FarmConnect
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center gap-1 text-base font-medium ${
                pathname === "/"
                  ? "text-green-700 font-bold"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              <IoIosHome size={18} /> Home
            </Link>

            <button
              onClick={handleMyAccount}
              className="flex items-center gap-1 text-base text-gray-600 hover:text-green-700 font-medium"
            >
              <FaUserCircle size={16} />
              Dashboard
            </button>

            {role ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-semibold shadow"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/authentication/signIn"
                className="px-5 py-1.5 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition font-semibold"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Hamburger icon for mobile */}
          <div className="md:hidden relative">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="text-black"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-4 space-y-3 z-50 w-48">
                <Link
                  href="/"
                  className="block text-sm font-medium text-gray-700 hover:text-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <button
                  onClick={() => {
                    handleMyAccount();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-sm font-medium text-gray-700 hover:text-green-700 w-full text-left"
                >
                  Dashboard
                </button>

                {role ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/authentication/signIn"
                    className="block text-center px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </main>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter, usePathname } from "next/navigation";
// import { clearUser } from "@/store/userSlice";
// import { RootState } from "@/store/store";
// import { clearBrokers, clearBrokersWithRatings } from "@/store/brokerSlice";
// import { IoIosHome } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { LogOut } from "lucide-react";

// export default function HomePageNavbar() {
//   const router = useRouter();
//   const pathname = usePathname();
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
//     dispatch(clearUser());
//     dispatch(clearBrokers()); //optional  Clear Broker Slice
//     dispatch(clearBrokersWithRatings());
//     router.push("/");
//   };

//   return (
//     <main className="bg-gradient-to-br from-green-100 to-green-200 flex flex-col">
//       <header className="sticky top-0 z-50 w-full px-6 py-4 shadow-md bg-white border-b border-green-300">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           {/* Logo and Brand */}
//           <Link
//             href="/"
//             className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
//           >
//             <Image
//               src="/logo.png"
//               width={50}
//               height={50}
//               alt="FarmConnect Logo"
//             />
//             <h1 className="text-2xl font-extrabold text-green-700 tracking-wide">
//               FarmConnect
//             </h1>
//           </Link>

//           {/* Navigation */}
//           <nav className="space-x-5 text-sm flex items-center">
//             <Link
//               href="/"
//               aria-label="Home"
//               className={`flex items-center gap-2 text-base font-medium ${
//                 pathname === "/"
//                   ? "text-green-700 font-bold"
//                   : "text-gray-600 hover:text-green-700"
//               }`}
//             >
//               <IoIosHome size={20} /> Home
//             </Link>

//             <button
//               aria-label="My Dashboard"
//               onClick={handleMyAccount}
//               className="flex items-center gap-2 text-base text-gray-600 hover:text-green-700 font-medium"
//             >
//               <FaUserCircle size={18} />
//               Dashboard
//             </button>

//             {role ? (
//               <button
//                 aria-label="Logout"
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
//                 Sign In
//               </Link>
//             )}
//           </nav>
//         </div>
//       </header>
//     </main>
//   );
// }
