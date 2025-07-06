"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import VegetableCard from "@/components/utility/VegetableCard";
import axios from "axios";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditVegetableModal from "@/components/utility/EditVegetableModal";
import baseUrl from "@/config/baseURL";

interface Vegetable {
  _id: string;
  vegetableName: string;
  expectedPrice: number;
  quantity: number;
  imageUrl: string;
  createdAt: string;
  unit: string;
  status: "active" | "sold" | "cancelled";
}

export default function FarmerDashboardPage() {
  const { id: farmerId } = useSelector((state: RootState) => state.user);
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);

  //for updation
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<Vegetable | null>(null);

  const fetchVegetables = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/vegetable-listings?farmerId=${farmerId}`
      );
      setVegetables(res.data);
    } catch (err) {
      console.error("Error fetching vegetables:", err);
    }
  };

  useEffect(() => {
    if (farmerId) {
      fetchVegetables();
    }
  }, [farmerId]);

  //for deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/api/vegetable-listings/${id}`);
      toast.success("Vegetable deleted successfully");
      fetchVegetables();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete vegetable");
    }
  };
  //for updation
  const handleEdit = (veg: Vegetable) => {
    setEditData(veg);
    setIsEditOpen(true);
  };

  //for saving the data.
  const handleSave = async (updatedData: Vegetable) => {
    try {
      await axios.put(
        `${baseUrl}/api/vegetable-listings/${updatedData._id}`,
        updatedData
      );
      toast.success("Vegetable updated successfully");
      fetchVegetables();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update vegetable");
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-900">My Vegetables</h1>

      {vegetables.length === 0 ? (
        <p className="text-gray-600 text-lg">No vegetables listed right now.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {vegetables.map((veg) => (
            <div key={veg._id} className="relative">
              <div className="absolute top-4.5 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(veg)}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full p-1"
                  title="Edit"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(veg._id)}
                  className="bg-red-100 hover:bg-red-200 text-red-800 rounded-full p-1"
                  title="Delete"
                >
                  <MdDelete />
                </button>
              </div>

              <VegetableCard
                id={veg._id}
                name={veg.vegetableName}
                price={veg.expectedPrice}
                quantity={veg.quantity}
                unit={veg.unit}
                image={veg.imageUrl}
                createdAt={veg.createdAt}
                type="farmer"
                initialStatus={veg.status}
                showRateButton={true}
              />
            </div>
          ))}
        </div>
      )}

      {editData && (
        <EditVegetableModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
          initialData={editData}
        />
      )}
    </div>
  );
}
