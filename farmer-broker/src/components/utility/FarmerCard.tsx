"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import baseUrl from "@/config/baseURL";

interface FarmerCardProps {
  fullname: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto?: string;
  id: string;
}

interface Vegetable {
  _id: string;
  vegetableName: string;
  quantity: number;
  expectedPrice: number;
  imageUrl?: string;
  createdAt: string;
  farmerId: string;
}

const FarmerCard: React.FC<FarmerCardProps> = ({
  fullname,
  email,
  phone,
  location,
  profilePhoto,
  id,
}) => {
  const [showOffers, setShowOffers] = useState(false);
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewOffers = async () => {
    if (showOffers) {
      setShowOffers(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}/api/vegetable-listings?farmerId=${id}`
      );
      setVegetables(res.data);
      setShowOffers(true);
    } catch (err) {
      console.error("Error fetching vegetable offers:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Image
        src={profilePhoto || "/dummyprofile.png"}
        alt="Farmer Profile"
        width={100}
        height={100}
        className="rounded-full border-4 border-blue-200 object-cover shadow-md"
      />
      <div className="mt-4 space-y-1 text-gray-700 w-full">
        <h2 className="text-xl font-bold text-blue-900">{fullname}</h2>
        <p className="text-sm">
          📧 <span className="font-medium">Email:</span> {email}
        </p>
        <p className="text-sm">
          📞 <span className="font-medium">Phone:</span> {phone}
        </p>
        <p className="text-sm">
          📍 <span className="font-medium">Location:</span> {location}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full justify-center">
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex gap-2 items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp
        </a>

        <button
          onClick={handleViewOffers}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
        >
          {showOffers ? "Hide Offers" : "View Offers"}
        </button>
      </div>

      {showOffers && (
        <div className="mt-4 w-full space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500">Loading offers...</p>
          ) : vegetables.length === 0 ? (
            <p className="text-sm text-gray-500">No vegetable offers.</p>
          ) : (
            vegetables.map((veg) => (
              <div
                key={veg._id}
                className="border p-3 rounded-md text-left shadow-sm bg-gray-100"
              >
                {veg.imageUrl && (
                  <img
                    src={veg.imageUrl}
                    alt={veg.vegetableName}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
                <h3 className="font-semibold text-lg">{veg.vegetableName}</h3>
                <p>Price: ₹{veg.expectedPrice}</p>
                <p>Quantity: {veg.quantity} kg</p>
                <p className="text-sm text-gray-500">
                  Added: {new Date(veg.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerCard;
