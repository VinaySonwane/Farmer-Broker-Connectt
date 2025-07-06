// pages/farmer/deals/page.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CompletedDeals from "@/components/rating/CompletedDeals";

const FarmerDealsPage = () => {
  const currentUser = useSelector((state: RootState) => state.user);

  if (!currentUser?.id) {
    return (
      <p className="text-center text-red-500 mt-8">
        Please log in to view your deals.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Completed Deals (Farmer)
      </h1>
      <CompletedDeals currentUserId={currentUser.id} />
    </div>
  );
};

export default FarmerDealsPage;
