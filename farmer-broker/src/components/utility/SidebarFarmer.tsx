"use client";

import { useRouter } from "next/navigation";
import { Users, PlusCircle, ListOrdered, Tractor } from "lucide-react";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarFarmer({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();

  const navItems = [
    {
      label: "All Brokers",
      icon: <Users className="w-5 h-5" />,
      path: "/dashboard/farmer/brokers",
    },
    {
      label: "Add Vegetable",
      icon: <PlusCircle className="w-5 h-5" />,
      path: "/dashboard/farmer/add-vegetable",
    },
    {
      label: "My Listed Vegetables",
      icon: <ListOrdered className="w-5 h-5" />,
      path: "/dashboard/farmer/",
    },
    {
      label: "Chats",
      icon: <IoChatboxEllipses className="w-5 h-5" />,
      path: "/dashboard/farmer/chats",
    },
    {
      label: "My Deals",
      icon: <FaHandshakeSimple className="w-5 h-5" />,
      path: "/dashboard/farmer/deals",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative z-50 md:translate-x-0 transition-transform duration-300 w-64 min-h-screen border-r p-6 bg-[#FFF9E6] shadow-md top-0 mt-16 md:mt-0 `}
    >
      {/* Close Button on mobile */}
      <div className="md:hidden flex justify-end">
        <button onClick={toggleSidebar} className="text-2xl text-green-800">
          <IoClose />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <Tractor className="w-7 h-7 text-green-800" />
        <h2 className="text-2xl font-bold text-green-900">Farmer Panel</h2>
      </div>

      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                router.push(item.path);
                toggleSidebar(); // close on nav
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2E7D32] hover:text-white text-left transition-all duration-200 text-green-800 font-medium"
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import { Users, PlusCircle, ListOrdered, Tractor } from "lucide-react";
// import { IoChatboxEllipses } from "react-icons/io5";
// import { FaHandshakeSimple } from "react-icons/fa6";

// export default function SidebarFarmer() {
//   const router = useRouter();

//   const navItems = [
//     {
//       label: "All Brokers",
//       icon: <Users className="w-5 h-5" />,
//       path: "/dashboard/farmer/brokers",
//     },
//     {
//       label: "Add Vegetable",
//       icon: <PlusCircle className="w-5 h-5" />,
//       path: "/dashboard/farmer/add-vegetable",
//     },
//     {
//       label: "My Listed Vegetables",
//       icon: <ListOrdered className="w-5 h-5" />,
//       path: "/dashboard/farmer/",
//     },
//     {
//       label: "Chats",
//       icon: <IoChatboxEllipses className="w-5 h-5" />,
//       path: "/dashboard/farmer/chats",
//     },
//     {
//       label: "My Deals",
//       icon: <FaHandshakeSimple className="w-5 h-5" />,
//       path: "/dashboard/farmer/deals",
//     },
//   ];

//   return (
//     // <aside className="w-64 min-h-screen bg-amber-300 border-r border-amber-400 shadow-lg p-6 sticky top-0">
//     // #659d60 bg-amber-100    hover:bg-green-600
//     <aside className="w-64 min-h-screen  border-r p-6  bg-[#FFF9E6]  shadow-md sticky top-0">
//       <div className="flex items-center gap-2 mb-8">
//         <Tractor className="w-7 h-7 text-green-800 transition-transform duration-200 group-hover:rotate-6" />

//         {/* <Tractor className="w-7 h-7 text-green-700" /> */}
//         <h2 className="text-2xl font-bold text-green-900">Farmer Panel</h2>
//       </div>

//       <ul className="space-y-3">
//         {navItems.map((item) => (
//           <li key={item.label}>
//             <button
//               onClick={() => router.push(item.path)}
//               className="w-full flex items-center gap-3 px-3 py-2 rounded-lg  hover:bg-[#2E7D32] hover:text-white text-left transition-all duration-200 text-green-800 font-medium"
//             >
//               {item.icon}
//               {item.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }
