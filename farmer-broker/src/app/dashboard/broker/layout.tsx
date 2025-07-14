// app/dashboard/broker/layout.tsx
"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/utility/DashboardNavbar";
import SidebarBroker from "@/components/utility/SidebarBroker";
import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
import { ReactNode } from "react";

export default function BrokerLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <RoleProtectedRoute allowedRole="broker">
      <div className="h-screen flex overflow-hidden relative">
        {/* Sidebar */}
        <SidebarBroker isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main layout */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-50">
            <DashboardNavbar toggleSidebar={toggleSidebar} />
          </header>

          <main className="flex-1 overflow-y-auto p-4 bg-[#FAF8EF]">
            {children}
          </main>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}

// // app/dashboard/broker/layout.tsx
// "use client";

// import DashboardNavbar from "@/components/utility/DashboardNavbar";
// import SidebarBroker from "@/components/utility/SidebarBroker";
// import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
// import { ReactNode } from "react";

// export default function BrokerLayout({ children }: { children: ReactNode }) {
//   return (
//     <RoleProtectedRoute allowedRole="broker">
//       <div className="h-screen flex overflow-hidden">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <SidebarBroker />
//         </aside>

//         {/* Main layout */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Sticky Navbar */}
//           <header className="sticky top-0 z-50">
//             <DashboardNavbar/>
//           </header>

//           {/* Scrollable content */}
//           <main className="flex-1 overflow-y-auto p-4 bg-[#FAF8EF]">
//             {children}
//           </main>
//         </div>
//       </div>
//     </RoleProtectedRoute>
//   );
// }
