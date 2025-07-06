// app/dashboard/farmer/layout.tsx
"use client";

import DashboardNavbar from "@/components/utility/DashboardNavbar";
import SidebarFarmer from "@/components/utility/SidebarFarmer";
import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
import { ReactNode } from "react";

export default function FarmerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProtectedRoute allowedRole="farmer">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar (left fixed) */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <SidebarFarmer />
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

// "use client";

// import DashboardNavbar from "@/components/utility/DashboardNavbar";
// import SidebarFarmer from "@/components/utility/SidebarFarmer";
// import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
// import { ReactNode } from "react";

// export default function FarmerLayout({ children }: { children: ReactNode }) {
//   return (
//     <RoleProtectedRoute allowedRole="farmer">
//       {/* Full height layout with navbar offset */}
//       <div className="min-h-screen">
//         {/* Fixed Navbar */}
//         <div className="fixed top-0 left-0 right-0 z-50 h-16">
//           <DashboardNavbar />
//         </div>

//         {/* Sidebar + Main Content */}
//         <div className="flex pt-16 min-h-screen">
//           <SidebarFarmer />
//           <main className="flex-1 p-4 bg-[#FAF8EF]">{children}</main>
//         </div>
//       </div>
//     </RoleProtectedRoute>
//   );
// }

// // app/dashboard/farmer/layout.tsx
// "use client";

// import DashboardNavbar from "@/components/utility/DashboardNavbar";
// import SidebarFarmer from "@/components/utility/SidebarFarmer";
// import RoleProtectedRoute from "@/components/Authentication/RoleProtectedRoute";
// import { ReactNode } from "react";
// //bg-amber-50"
// export default function FarmerLayout({ children }: { children: ReactNode }) {
//   return (
//     <RoleProtectedRoute allowedRole="farmer">
//       <div className="min-h-screen flex flex-col">
//         <DashboardNavbar />
//         <div className="flex flex-1">
//           <SidebarFarmer />
//           <main className="flex-1 p-4 bg-[#FAF8EF] ">{children}</main>
//         </div>
//       </div>
//     </RoleProtectedRoute>
//   );
// }
