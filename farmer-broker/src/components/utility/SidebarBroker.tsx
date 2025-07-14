// components/utility/SidebarBroker.tsx
"use client";

import { useRouter } from "next/navigation";
import { Home, PlusCircle, Users } from "lucide-react";
import { IoChatboxEllipses, IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarBroker({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();

  const navItems = [
    {
      label: "My Added Offers",
      icon: <Home size={18} />,
      path: "/dashboard/broker/",
    },
    {
      label: "All Farmers",
      icon: <Users size={18} />,
      path: "/dashboard/broker/farmers",
    },
    {
      label: "Add Vegetable Offer",
      icon: <PlusCircle size={18} />,
      path: "/dashboard/broker/add-offer",
    },
    {
      label: "Chats",
      icon: <IoChatboxEllipses size={18} />,
      path: "/dashboard/broker/chats",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative z-50 md:translate-x-0 transition-transform duration-300 w-64 min-h-screen border-r p-6 bg-[#FFF9E6] shadow-md top-0 mt-16 md:mt-0`}
    >
      {/* Close Button on mobile */}
      <div className="md:hidden flex justify-end">
        <button onClick={toggleSidebar} className="text-2xl text-green-800">
          <IoClose />
        </button>
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-6">
        🧑‍💼 Broker Panel
      </h2>

      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => {
                router.push(item.path);
                toggleSidebar(); // auto-close sidebar on mobile
              }}
              className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-white w-full px-3 py-2 rounded-md transition font-medium text-green-800"
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
// import { Home, PlusCircle, Users } from "lucide-react";
// import { IoChatboxEllipses } from "react-icons/io5";

// export default function SidebarBroker() {
//   const router = useRouter();

//   return (
//     <aside className="w-64 min-h-screen p-6  bg-[#FFF9E6] text-black shadow-md ">
//       <h2 className="text-2xl font-bold text-green-800 mb-6">
//         🧑‍💼 Broker Panel
//       </h2>
//       <ul className="space-y-4">
//         <li>
//           <button
//             onClick={() => router.push("/dashboard/broker/")}
//             className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
//           >
//             <Home size={18} /> My Added Offers
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => router.push("/dashboard/broker/farmers")}
//             className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
//           >
//             <Users size={18} /> All Farmers
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => router.push("/dashboard/broker/add-offer")}
//             className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
//           >
//             <PlusCircle size={18} /> Add Vegetable Offer
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => router.push("/dashboard/broker/chats")}
//             className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
//           >
//             <IoChatboxEllipses size={18} /> Chats
//           </button>
//         </li>
//       </ul>
//     </aside>
//   );
// }
