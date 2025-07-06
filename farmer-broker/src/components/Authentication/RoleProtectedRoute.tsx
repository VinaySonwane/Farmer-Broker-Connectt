"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { RootState } from "@/store/store";

export default function RoleProtectedRoute({
  allowedRole,
  children,
}: {
  allowedRole: "farmer" | "broker";
  children: ReactNode;
}) {
  const router = useRouter();
  const role = useSelector((state: RootState) => state.user.role);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!role) return;

    if (role !== allowedRole) {
      if (role === "farmer") router.replace("/dashboard/farmer");
      else if (role === "broker") router.replace("/dashboard/broker");
      else router.replace("/");
    }

    setIsChecking(false);
  }, [role, allowedRole, router]);

  if (isChecking || !role) {
    return (
      <div className="text-center text-white p-4">Checking permissions...</div>
    );
  }

  return <>{children}</>;
}
