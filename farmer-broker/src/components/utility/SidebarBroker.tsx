"use client";

import { useRouter } from "next/navigation";
import { Home, PlusCircle, Users } from "lucide-react";
import { IoChatboxEllipses } from "react-icons/io5";

export default function SidebarBroker() {
  const router = useRouter();

  return (
    <aside className="w-64 min-h-screen p-6  bg-[#FFF9E6] text-black shadow-md ">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        🧑‍💼 Broker Panel
      </h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => router.push("/dashboard/broker/")}
            className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
          >
            <Home size={18} /> My Added Offers
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/broker/farmers")}
            className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
          >
            <Users size={18} /> All Farmers
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/broker/add-offer")}
            className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
          >
            <PlusCircle size={18} /> Add Vegetable Offer
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/dashboard/broker/chats")}
            className="flex items-center gap-2 text-left hover:bg-green-600 hover:text-green-900 w-full px-3 py-2 rounded-md transition"
          >
            <IoChatboxEllipses size={18} /> Chats
          </button>
        </li>
      </ul>
    </aside>
  );
}

// "use client";

// import { useRouter } from "next/navigation";

// export default function SidebarBroker() {
//   const router = useRouter();

//   return (
//     <aside className="w-64  p-4 bg-amber-200 text-black">
//       <h2 className="text-lg font-semibold mb-4">Broker Menu</h2>
//       <ul className="space-y-2 ">
//         <li>
//           <button
//             className="hover:text-white"
//             onClick={() => router.push("/dashboard/broker/")}
//           >
//             My Added offers
//           </button>
//         </li>
//         <li>
//           <button
//             className="hover:text-white"
//             onClick={() => router.push("/dashboard/broker/farmers")}
//           >
//             All Farmers
//           </button>
//         </li>
//         <li>
//           <button
//             className="hover:text-white"
//             onClick={() => router.push("/dashboard/broker/add-offer")}
//           >
//             Add Vegetable Offer
//           </button>
//         </li>
//       </ul>
//     </aside>
//   );
// }
