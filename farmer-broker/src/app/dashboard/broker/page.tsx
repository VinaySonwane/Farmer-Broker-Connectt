"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { toast } from "sonner";
import { MdEdit, MdDelete } from "react-icons/md";
import EditOfferModal from "@/components/utility/EditOfferModal";
import VegetableCard from "@/components/utility/VegetableCard"; // Reuse existing card
import baseUrl from "@/config/baseURL";

interface Offer {
  _id: string;
  vegetableName: string;
  offeredPrice: number;
  unit: string;
  imageUrl?: string;
  createdAt: string;
}

export default function BrokerDashboardPage() {
  const { id: brokerId } = useSelector((state: RootState) => state.user);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<Offer | null>(null);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/offers/broker/${brokerId}`);
      setOffers(res.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    if (brokerId) fetchOffers();
  }, [brokerId]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/api/offers/${id}`);
      toast.success("Offer deleted successfully");
      fetchOffers();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete offer");
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditData(offer);
    setIsEditOpen(true);
  };

  const handleSave = async (updatedData: Offer) => {
    try {
      await axios.put(`${baseUrl}/api/offers/${updatedData._id}`, updatedData);
      toast.success("Offer updated successfully");
      fetchOffers();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update offer");
    } finally {
      setIsEditOpen(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#FAF8EF]">
      <h1 className="text-2xl font-bold text-blue-800">My Offers</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer._id} className="relative">
            <div className="absolute top-4.5 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(offer)}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full p-1"
                title="Edit"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(offer._id)}
                className="bg-red-100 hover:bg-red-200 text-red-800 rounded-full p-1"
                title="Delete"
              >
                <MdDelete />
              </button>
            </div>

            <VegetableCard
              id={offer._id}
              name={offer.vegetableName}
              price={offer.offeredPrice}
              image={offer.imageUrl || "/dummyOffer.jpg"}
              createdAt={offer.createdAt}
              unit={offer.unit}
              type="broker"
              initialStatus="active"
            />
          </div>
        ))}
      </div>

      {editData && (
        <EditOfferModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
          initialData={editData}
        />
      )}
    </div>
  );
}
