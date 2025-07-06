"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import baseUrl from "@/config/baseURL";

export default function AddOfferPage() {
  const { id: brokerId } = useSelector((state: RootState) => state.user);

  const [form, setForm] = useState({
    listingId: "",
    vegetableName: "",
    offeredPrice: "",
    unit: "kg",
    message: "",
    status: "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/api/offers`, {
        ...form,
        offeredPrice: Number(form.offeredPrice),
        brokerId,
      });

      toast.success("✅ Offer created successfully!");
      setForm({
        listingId: "",
        vegetableName: "",
        offeredPrice: "",
        unit: "kg",
        message: "",
        status: "pending",
      });
    } catch (err) {
      console.error("Error creating offer:", err);
      toast.error("❌ Failed to create offer.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-6 bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          🥕 Add Vegetable Offer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Vegetable Name
            </label>
            <input
              type="text"
              name="vegetableName"
              placeholder="e.g. Tomato"
              value={form.vegetableName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Offered Price
            </label>
            <input
              type="number"
              name="offeredPrice"
              placeholder="e.g. 35"
              value={form.offeredPrice}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="kg">per kg</option>
              <option value="100kg">per 100kg</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Message (optional)
            </label>
            <input
              type="text"
              name="message"
              placeholder="Any note to farmer..."
              value={form.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition"
          >
            ➕ Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { toast } from "sonner";

// export default function AddOfferPage() {
//   const { id: brokerId } = useSelector((state: RootState) => state.user);

//   const [form, setForm] = useState({
//     listingId: "",
//     vegetableName: "",
//     offeredPrice: "",
//     unit: "kg",
//     message: "",
//     status: "pending",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8000/api/offers", {
//         ...form,
//         offeredPrice: Number(form.offeredPrice),
//         brokerId,
//       });

//       toast.success("Offer created successfully!");
//       setForm({
//         listingId: "",
//         vegetableName: "",
//         offeredPrice: "",
//         unit: "kg",
//         message: "",
//         status: "pending",
//       });
//     } catch (err) {
//       console.error("Error creating offer:", err);
//       toast.error("Failed to create offer.");
//     }
//   };

//   return (
//     <div className="flex justify-start items-start p-6">
//       <div className="bg-white shadow rounded p-6 w-[400px]">
//         <h1 className="text-2xl font-bold text-blue-900 mb-4">
//           Add Vegetable Offer
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="vegetableName"
//             placeholder="Vegetable Name"
//             value={form.vegetableName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded text-black"
//             required
//           />
//           <input
//             type="number"
//             name="offeredPrice"
//             placeholder="Offered Price"
//             value={form.offeredPrice}
//             onChange={handleChange}
//             className="w-full border p-2 rounded text-black"
//             required
//           />
//           <select
//             name="unit"
//             value={form.unit}
//             onChange={handleChange}
//             className="w-full border p-2 rounded text-black"
//           >
//             <option value="kg">per kg</option>
//             <option value="100kg">per 100kg</option>
//           </select>
//           <input
//             type="text"
//             name="message"
//             placeholder="Message (optional)"
//             value={form.message}
//             onChange={handleChange}
//             className="w-full border p-2 rounded text-black"
//           />
//           <button
//             type="submit"
//             className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
//           >
//             Add Offer
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
