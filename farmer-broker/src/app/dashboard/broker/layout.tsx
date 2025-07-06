// app/dashboard/broker/layout.tsx
"use client";

import DashboardNavbar from "@/components/utility/DashboardNavbar";
import SidebarBroker from "@/components/utility/SidebarBroker";
import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
import { ReactNode } from "react";

export default function BrokerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProtectedRoute allowedRole="broker">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <SidebarBroker />
        </aside>

        {/* Main layout */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sticky Navbar */}
          <header className="sticky top-0 z-50">
            <DashboardNavbar />
          </header>

          {/* Scrollable content */}
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
//       <div className="min-h-screen flex flex-col">
//         <DashboardNavbar />
//         <div className="flex flex-1 min-h-screen">
//           <SidebarBroker />
//           <main className="flex-1 p-4 bg-[#FAF8EF]">{children}</main>
//         </div>
//       </div>
//     </RoleProtectedRoute>
//   );
// }
