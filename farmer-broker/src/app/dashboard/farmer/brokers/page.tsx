"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BrokerCard from "@/components/utility/BrokerCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setBrokers } from "@/store/brokerSlice";
import { useRouter } from "next/navigation";
import baseUrl from "@/config/baseURL";

interface Offer {
  _id: string;
  vegetableName: string;
  vegetableId: string;
  offeredPrice: number;
  unit?: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Broker {
  _id: string;
  fullname: string;
  email: string;
  phoneNo: string;
  location: string;
  profilePhoto?: string;
  rating?: number;
  ratingCount?: number;
}

const LOCATIONS = [
  "Amravati",
  "Gondia",
  "Nagpur",
  "Nashik",
  "Pune",
  "Raigad",
  "Ramtek",
  "Tumsar",
];

export default function AllBrokersPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduxBrokers = useSelector((state: RootState) => state.broker.brokers);
  const currentUser = useSelector((state: RootState) => state.user);

  const [brokersWithRatings, setBrokersWithRatings] = useState<Broker[]>([]);
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [sortByRating, setSortByRating] = useState<"asc" | "desc" | "">("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchBrokersAndRatings = async () => {
      try {
        let brokers = reduxBrokers;
        if (reduxBrokers.length === 0) {
          const res = await axios.get(`${baseUrl}/api/users?role=broker`);
          brokers = res.data;
          dispatch(setBrokers(brokers));
        }

        const enrichedBrokers = await Promise.all(
          brokers.map(async (broker: Broker) => {
            try {
              const ratingRes = await axios.get(
                `${baseUrl}/api/ratings/${broker._id}`
              );
              const { ratings } = ratingRes.data;

              const ratingSum = Array.isArray(ratings)
                ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0)
                : 0;

              const avgRating = ratings.length
                ? (ratingSum / ratings.length).toFixed(1)
                : null;

              return {
                ...broker,
                rating: avgRating ? parseFloat(avgRating) : undefined,
                ratingCount: ratings.length || 0,
              };
            } catch (err) {
              console.error("Rating fetch failed for broker", broker._id, err);
              return broker;
            }
          })
        );

        setBrokersWithRatings(enrichedBrokers);
      } catch (err) {
        console.error("Failed to fetch brokers or ratings:", err);
      }
    };

    fetchBrokersAndRatings();
  }, [reduxBrokers, dispatch]);

  const handleViewOffers = async (brokerId: string) => {
    try {
      setSelectedBrokerId(brokerId);
      const res = await axios.get(`${baseUrl}/api/offers/broker/${brokerId}`);
      setOffers(res.data);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    }
  };

  const handleMarkDealDone = async (offer: Offer) => {
    try {
      await axios.post(`${baseUrl}/api/deals`, {
        brokerId: selectedBrokerId,
        farmerId: currentUser.id,
        price: offer.offeredPrice,
        quantity: 1,
        vegetable: offer.vegetableName,
      });
      router.push("/dashboard/farmer/deals");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data);
      } else {
        console.error("Error:", err);
      }
    }
  };

  const filteredAndSortedBrokers = [...brokersWithRatings]
    .filter((broker) => {
      const matchesSearch = broker.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation
        ? broker.location === selectedLocation
        : true;
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      if (sortByRating) {
        return sortByRating === "asc"
          ? (a.rating || 0) - (b.rating || 0)
          : (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div className="p-6 text-black bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-emerald-800">All Brokers</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm w-64"
        />

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        >
          <option value="">Filter by Location</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={sortByRating}
          onChange={(e) =>
            setSortByRating(e.target.value as "asc" | "desc" | "")
          }
          className="px-3 py-2 border rounded shadow-sm"
        >
          <option value="">Sort by Rating</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Conditional Broker / Offers View */}
      {!selectedBrokerId ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBrokers.map((broker) => (
            <BrokerCard
              key={broker._id}
              _id={broker._id}
              fullname={broker.fullname}
              email={broker.email}
              phone={broker.phoneNo}
              location={broker.location}
              profilePhoto={broker.profilePhoto}
              rating={broker.rating}
              ratingCount={broker.ratingCount}
              onViewOffers={handleViewOffers}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left: Selected Broker Profile */}
          <div className="w-full md:w-1/2">
            {(() => {
              const broker = filteredAndSortedBrokers.find(
                (b) => b._id === selectedBrokerId
              );
              if (!broker) return null;

              return (
                <BrokerCard
                  key={broker._id}
                  _id={broker._id}
                  fullname={broker.fullname}
                  email={broker.email}
                  phone={broker.phoneNo} // ✅ fixed here
                  location={broker.location}
                  profilePhoto={broker.profilePhoto}
                  rating={broker.rating}
                  ratingCount={broker.ratingCount}
                  onViewOffers={() => {}} // optional, since this view doesn't use it
                  disabled // optionally hide buttons inside the card
                />
              );
            })()}
          </div>

          {/* Right: Offers */}
          <div className="w-full md:w-1/2 ">
            <button
              onClick={() => setSelectedBrokerId(null)}
              className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              ← Back to All Brokers
            </button>

            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-2 text-emerald-800">
                Offers by Broker
              </h2>
              {offers.length === 0 ? (
                <p className="text-gray-500">No offers found.</p>
              ) : (
                <ul className="space-y-3">
                  {offers.map((offer) => (
                    <li key={offer._id} className="border p-3 rounded">
                      <p>
                        <strong>Vegetable:</strong> {offer.vegetableName}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{offer.offeredPrice} /{" "}
                        {offer.unit || "kg"}
                      </p>
                      {offer.message && (
                        <p>
                          <strong>Message:</strong> {offer.message}
                        </p>
                      )}
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="capitalize">{offer.status}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Date:</strong>{" "}
                        {new Date(offer.createdAt).toLocaleString()}
                      </p>
                      {offer.status !== "Completed" && (
                        <button
                          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                          onClick={() => handleMarkDealDone(offer)}
                        >
                          Mark Deal Done
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import BrokerCard from "@/components/utility/BrokerCard";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { setBrokers } from "@/store/brokerSlice";
// import { useRouter } from "next/navigation";

// interface Offer {
//   _id: string;
//   vegetableName: string;
//   vegetableId: string;
//   offeredPrice: number;
//   unit?: string;
//   message: string;
//   status: string;
//   createdAt: string;
// }

// interface Broker {
//   _id: string;
//   fullname: string;
//   email: string;
//   phoneNo: string;
//   location: string;
//   profilePhoto?: string;
//   rating?: number;
//   ratingCount?: number;
// }

// const LOCATIONS = [
//   "Amravati",
//   "Gondia",
//   "Nagpur",
//   "Nashik",
//   "Pune",
//   "Raigad",
//   "Ramtek",
//   "Tumsar",
// ];

// export default function AllBrokersPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const reduxBrokers = useSelector((state: RootState) => state.broker.brokers);
//   const currentUser = useSelector((state: RootState) => state.user);

//   const [brokersWithRatings, setBrokersWithRatings] = useState<Broker[]>([]);
//   const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
//   const [offers, setOffers] = useState<Offer[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<string>("");
//   const [sortByRating, setSortByRating] = useState<"asc" | "desc" | "">("");
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     const fetchBrokersAndRatings = async () => {
//       try {
//         let brokers = reduxBrokers;
//         if (reduxBrokers.length === 0) {
//           const res = await axios.get(
//             "http://localhost:8000/api/users?role=broker"
//           );
//           brokers = res.data;
//           dispatch(setBrokers(brokers));
//         }

//         const enrichedBrokers = await Promise.all(
//           brokers.map(async (broker: Broker) => {
//             try {
//               const ratingRes = await axios.get(
//                 `http://localhost:8000/api/ratings/${broker._id}`
//               );
//               const { ratings } = ratingRes.data;

//               const ratingSum = Array.isArray(ratings)
//                 ? ratings.reduce((sum: number, r: any) => sum + r.rating, 0)
//                 : 0;

//               const avgRating = ratings.length
//                 ? (ratingSum / ratings.length).toFixed(1)
//                 : null;

//               return {
//                 ...broker,
//                 rating: avgRating ? parseFloat(avgRating) : undefined,
//                 ratingCount: ratings.length || 0,
//               };
//             } catch (err) {
//               console.error("Rating fetch failed for broker", broker._id, err);
//               return broker;
//             }
//           })
//         );

//         setBrokersWithRatings(enrichedBrokers);
//       } catch (err) {
//         console.error("Failed to fetch brokers or ratings:", err);
//       }
//     };

//     fetchBrokersAndRatings();
//   }, [reduxBrokers, dispatch]);

//   const handleViewOffers = async (brokerId: string) => {
//     try {
//       setSelectedBrokerId(brokerId);
//       const res = await axios.get(
//         `http://localhost:8000/api/offers/broker/${brokerId}`
//       );
//       setOffers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch offers:", err);
//     }
//   };

//   const handleMarkDealDone = async (offer: Offer) => {
//     try {
//       await axios.post("http://localhost:8000/api/deals", {
//         brokerId: selectedBrokerId,
//         farmerId: currentUser.id,
//         price: offer.offeredPrice,
//         quantity: 1,
//         vegetable: offer.vegetableName,
//       });
//       router.push("/dashboard/farmer/deals");
//     } catch (err: any) {
//       if (axios.isAxiosError(err)) {
//         console.error("Axios Error:", err.response?.data);
//       } else {
//         console.error("Error:", err);
//       }
//     }
//   };

//   const filteredAndSortedBrokers = [...brokersWithRatings]
//     .filter((broker) => {
//       const matchesSearch = broker.fullname
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesLocation = selectedLocation
//         ? broker.location === selectedLocation
//         : true;
//       return matchesSearch && matchesLocation;
//     })
//     .sort((a, b) => {
//       if (sortByRating) {
//         return sortByRating === "asc"
//           ? (a.rating || 0) - (b.rating || 0)
//           : (b.rating || 0) - (a.rating || 0);
//       }
//       return 0;
//     });

//   return (
//     <div className="p-6 text-black bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-emerald-800">All Brokers</h1>

//       {/* Filter Controls */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-3 py-2 border rounded shadow-sm w-64"
//         />

//         <select
//           value={selectedLocation}
//           onChange={(e) => setSelectedLocation(e.target.value)}
//           className="px-3 py-2 border rounded shadow-sm"
//         >
//           <option value="">Filter by Location</option>
//           {LOCATIONS.map((loc) => (
//             <option key={loc} value={loc}>
//               {loc}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sortByRating}
//           onChange={(e) =>
//             setSortByRating(e.target.value as "asc" | "desc" | "")
//           }
//           className="px-3 py-2 border rounded shadow-sm"
//         >
//           <option value="">Sort by Rating</option>
//           <option value="asc">Low to High</option>
//           <option value="desc">High to Low</option>
//         </select>
//       </div>

//       {/* Broker Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredAndSortedBrokers.map((broker) => (
//           <BrokerCard
//             key={broker._id}
//             _id={broker._id}
//             fullname={broker.fullname}
//             email={broker.email}
//             phone={broker.phoneNo}
//             location={broker.location}
//             profilePhoto={broker.profilePhoto}
//             rating={broker.rating}
//             ratingCount={broker.ratingCount}
//             onViewOffers={handleViewOffers}
//           />
//         ))}
//       </div>

//       {/* Broker Offers Section */}
//       {selectedBrokerId && (
//         <div className="bg-white p-4 rounded shadow-md mt-6">
//           <h2 className="text-lg font-semibold mb-2">Offers by Broker</h2>
//           {offers.length === 0 ? (
//             <p className="text-gray-500">No offers found.</p>
//           ) : (
//             <ul className="space-y-3">
//               {offers.map((offer) => (
//                 <li key={offer._id} className="border p-3 rounded">
//                   <p>
//                     <strong>Vegetable:</strong> {offer.vegetableName}
//                   </p>
//                   <p>
//                     <strong>Price:</strong> ₹{offer.offeredPrice} /{" "}
//                     {offer.unit || "kg"}
//                   </p>
//                   {offer.message && (
//                     <p>
//                       <strong>Message:</strong> {offer.message}
//                     </p>
//                   )}
//                   <p>
//                     <strong>Status:</strong>{" "}
//                     <span className="capitalize">{offer.status}</span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     <strong>Date:</strong>{" "}
//                     {new Date(offer.createdAt).toLocaleString()}
//                   </p>
//                   {offer.status !== "Completed" && (
//                     <button
//                       className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
//                       onClick={() => handleMarkDealDone(offer)}
//                     >
//                       Mark Deal Done
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
//
