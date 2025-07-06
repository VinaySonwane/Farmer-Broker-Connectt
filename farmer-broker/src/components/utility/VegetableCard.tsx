"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import baseUrl from "@/config/baseURL";

interface Props {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  unit?: string;
  image: string;
  createdAt: string;
  type: "farmer" | "broker";
  initialStatus: "active" | "sold" | "cancelled";
  showRateButton?: boolean;
}

export default function VegetableCard({
  id,
  name,
  price,
  quantity,
  unit,
  image,
  createdAt,
  type,
  initialStatus,
  showRateButton = false,
}: Props) {
  const [status, setStatus] = useState<"active" | "sold" | "cancelled">(
    initialStatus
  );
  const router = useRouter();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleMarkAsCompleted = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/vegetable-listings/${id}/status`,
        {
          status: "sold",
        }
      );
      toast.success("Marked as Completed");
      setStatus("sold");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleRateRedirect = () => {
    router.push("/dashboard/farmer/deals");
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow w-full max-w-sm m-4">
      <Image
        src={image}
        alt={name}
        width={400}
        height={300}
        className="rounded-md object-cover w-full h-48 mt-3"
      />
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-green-800">{name}</h3>
          <div className="text-sm">
            <span className="text-green-600">Added on: </span>
            <span className="text-gray-600">{formattedDate}</span>
          </div>
        </div>

        {type === "farmer" ? (
          <>
            <p className="text-gray-700">
              Expected Price: ₹{price} / {unit || "kg"}
            </p>
            <p className="text-gray-700">
              Quantity: {quantity} {unit || "kg"}
            </p>
          </>
        ) : (
          <p className="text-gray-700">
            Offered Price: ₹{price} / {unit || "kg"}
          </p>
        )}

        <p className="text-gray-800 font-medium">
          Status:{" "}
          <span
            className={
              status === "sold"
                ? "text-green-600"
                : status === "cancelled"
                ? "text-red-600"
                : "text-yellow-600"
            }
          >
            {status === "sold" ? "Completed" : status}
          </span>
        </p>

        {type === "farmer" && status === "active" && (
          <button
            onClick={handleMarkAsCompleted}
            className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded"
          >
            Mark as Completed
          </button>
        )}

        {type === "farmer" && status === "sold" && showRateButton && (
          <button
            onClick={handleRateRedirect}
            className="mt-2 ml-2 inline-block bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded"
          >
            Rate Broker
          </button>
        )}
      </div>
    </div>
  );
}
