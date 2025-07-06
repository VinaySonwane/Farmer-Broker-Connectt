"use client";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import baseUrl from "@/config/baseURL";

export default function AddVegetablePage() {
  const { id: farmerId } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    vegetableName: "",
    quantity: 0,
    expectedPrice: 0,
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl || !farmerId) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/vegetable-listings`,
        {
          farmerId,
          vegetableName: formData.vegetableName,
          quantity: formData.quantity,
          expectedPrice: formData.expectedPrice,
          imageUrl: formData.imageUrl,
        }
      );

     // console.log("Response:", res.data);
      alert("Vegetable added!");
      setFormData({
        vegetableName: "",
        quantity: 0,
        expectedPrice: 0,
        imageUrl: "",
      });
    } catch (err: any) {
      console.error("Submission failed", err.response?.data || err.message);
      alert("Failed to submit. See console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-green-700 border-b pb-2">
        Add a New Vegetable
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Vegetable Name
          </label>
          <input
            name="vegetableName"
            placeholder="E.g., Tomato"
            onChange={handleChange}
            value={formData.vegetableName}
            className="border border-gray-300 text-gray-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Quantity (kg)
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="E.g., 100"
            onChange={handleChange}
            value={formData.quantity}
            className="border border-gray-300  text-gray-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Expected Price (₹/kg)
          </label>
          <input
            name="expectedPrice"
            type="number"
            placeholder="E.g., 30"
            onChange={handleChange}
            value={formData.expectedPrice}
            className="border border-gray-300  text-gray-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            name="imageUrl"
            placeholder="Paste image URL"
            type="text"
            onChange={handleChange}
            value={formData.imageUrl}
            className="border border-gray-300  text-gray-700 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          ➕ Add Vegetable
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

// export default function AddVegetablePage() {
//   const { id: farmerId } = useSelector((state: RootState) => state.user);

//   const [formData, setFormData] = useState({
//     vegetableName: "",
//     quantity: 0,
//     expectedPrice: 0,
//     imageUrl: "", // use URL string instead of File
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.imageUrl || !farmerId) {
//       alert("Please fill all fields correctly.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/vegetable-listings",
//         {
//           farmerId,
//           vegetableName: formData.vegetableName,
//           quantity: formData.quantity,
//           expectedPrice: formData.expectedPrice,
//           imageUrl: formData.imageUrl,
//         }
//       );

//       console.log("Response:", res.data);
//       alert("Vegetable added!");
//       // ✅ Reset form
//       setFormData({
//         vegetableName: "",
//         quantity: 0,
//         expectedPrice: 0,
//         imageUrl: "",
//       });
//     } catch (err: any) {
//       console.error("Submission failed", err.response?.data || err.message);
//       alert("Failed to submit. See console for details.");
//     }
//   };

//   return (
//     <div className="p-4 bg-white text-black w-120">
//       <h1 className="text-xl font-bold mb-4">Add Vegetable</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="vegetableName"
//           placeholder="Name"
//           onChange={handleChange}
//           value={formData.vegetableName}
//           className="border p-2 block w-full"
//         />
//         <input
//           name="quantity"
//           placeholder="Quantity"
//           type="number"
//           onChange={handleChange}
//           value={formData.quantity}
//           className="border p-2 block w-full"
//         />
//         <input
//           name="expectedPrice"
//           placeholder="Expected Price"
//           type="number"
//           onChange={handleChange}
//           value={formData.expectedPrice}
//           className="border p-2 block w-full"
//         />
//         <input
//           name="imageUrl"
//           placeholder="Image URL"
//           type="text"
//           onChange={handleChange}
//           value={formData.imageUrl}
//           className="border p-2 block w-full"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </form>
//     </div>
//   );
// }
