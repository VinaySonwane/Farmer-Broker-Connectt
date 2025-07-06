"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FarmerCard from "@/components/utility/FarmerCard";
import baseUrl from "@/config/baseURL";

interface Farmer {
  _id: string;
  fullname: string;
  email: string;
  phoneNo: string;
  location: string;
  profilePhoto?: string;
}

export default function AllFarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/users?role=farmer`);
        setFarmers(res.data);
      } catch (err) {
        console.error("Failed to fetch farmers:", err);
      }
    };

    fetchFarmers();
  }, []);

  const filteredFarmers = farmers
    .filter((farmer) =>
      farmer.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.location.localeCompare(b.location);
      if (sortOrder === "desc") return b.location.localeCompare(a.location);
      return 0;
    });

  return (
    <div className="p-6 text-black bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">All Farmers</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "")}
        >
          <option value="">Sort by Location</option>
          <option value="asc">Location A-Z</option>
          <option value="desc">Location Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <FarmerCard
            key={farmer._id}
            id={farmer._id}
            fullname={farmer.fullname}
            email={farmer.email}
            phone={farmer.phoneNo}
            location={farmer.location}
            profilePhoto={farmer.profilePhoto}
          />
        ))}
      </div>
    </div>
  );
}

// // app/broker/all-farmers/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import FarmerCard from "@/components/utility/FarmerCard";

// interface Farmer {
//   _id: string;
//   fullname: string;
//   email: string;

//   phoneNo: string;
//   location: string;
//   profilePhoto?: string;
// }

// export default function AllFarmersPage() {
//   const [farmers, setFarmers] = useState<Farmer[]>([]);

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/api/users?role=farmer"
//         );
//         setFarmers(res.data);
//       } catch (err) {
//         console.error("Failed to fetch farmers:", err);
//       }
//     };

//     fetchFarmers();
//   }, []);

//   return (
//     <div className="p-6 text-black bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-blue-800">All Farmers</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {farmers.map((farmer) => (
//           <FarmerCard
//             key={farmer._id}
//             id={farmer._id}
//             fullname={farmer.fullname}
//             email={farmer.email}
//             phone={farmer.phoneNo}
//             location={farmer.location}
//             profilePhoto={farmer.profilePhoto}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
