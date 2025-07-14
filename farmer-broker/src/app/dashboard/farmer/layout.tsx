// app/dashboard/farmer/layout.tsx
"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/utility/DashboardNavbar";
import SidebarFarmer from "@/components/utility/SidebarFarmer";
import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
import { ReactNode } from "react";

export default function FarmerLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <RoleProtectedRoute allowedRole="farmer">
      <div className="h-screen flex overflow-hidden relative">
        {/* Sidebar */}
        <SidebarFarmer isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main layout */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="sticky top-0 z-50">
            <DashboardNavbar toggleSidebar={toggleSidebar} />
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 bg-[#FAF8EF]">
            {children}
          </main>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}

// // app/dashboard/farmer/layout.tsx
// "use client";

// import DashboardNavbar from "@/components/utility/DashboardNavbar";
// import SidebarFarmer from "@/components/utility/SidebarFarmer";
// import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
// import { ReactNode } from "react";

// export default function FarmerLayout({ children }: { children: ReactNode }) {
//   return (
//     <RoleProtectedRoute allowedRole="farmer">
//       <div className="h-screen flex overflow-hidden">
//         {/* Sidebar (left fixed) */}
//         <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
//           <SidebarFarmer />
//         </aside>

//         {/* Main layout */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           {/* Sticky Navbar */}
//           <header className="sticky top-0 z-50">
//             <DashboardNavbar />
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
