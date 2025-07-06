// components/CompletedDeals.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import RatingForm from "./RatingForm";
import baseUrl from "@/config/baseURL";

// ✅ Inline Type Definitions
interface DealType {
  _id: string;
  vegetable: string;
  quantity: number;
  price: number;
  farmer: {
    _id: string;
    fullname: string;
  };
  review: string;
  broker: {
    _id: string;
    fullname: string;
  };
  status: "Pending" | "Completed";
}

// interface RatingType {
//   _id: string;
//   dealId: string;
//   ratedBy: string;
//   ratedUser: string;

//   rating: number;
//   review: string;
//   obtainedPrice: number;
// }

const CompletedDeals = ({ currentUserId }: { currentUserId: string }) => {
  const [deals, setDeals] = useState<DealType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/deals/completed/${currentUserId}`
      );
      setDeals(res.data);
    } catch (err) {
      console.error("Failed to fetch completed deals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) return <p>Loading completed deals...</p>;
  if (deals.length === 0) return <p>No completed deals found.</p>;

  return (
    <div className="space-y-4">
      {deals.map((deal) => {
        const otherUser =
          deal.farmer._id === currentUserId ? deal.broker : deal.farmer;

        return (
          <div key={deal._id} className="border p-4 rounded shadow text-black">
            <h3 className="font-semibold text-lg">
              Vegetable: {deal.vegetable} | Quantity: {deal.quantity} | Price: ₹
              {deal.price}
            </h3>
            <p>
              Dealt with: <strong>{otherUser.fullname}</strong>
            </p>

            <RatingForm
              dealId={deal._id}
              ratedBy={currentUserId}
              ratedUser={otherUser._id}
              dealPrice={deal.price} // 👈 Pass this down
              onSuccess={() => fetchDeals()} // ✅ Fix for second error
            />
          </div>
        );
      })}
    </div>
  );
};

export default CompletedDeals;
