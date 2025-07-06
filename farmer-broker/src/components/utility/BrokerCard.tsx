import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Eye, MessageSquare } from "lucide-react";

interface BrokerCardProps {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto?: string;
  onViewOffers?: (brokerId: string) => void;
  rating?: number;
  ratingCount?: number;
  disabled?: boolean;
}

const BrokerCard: React.FC<BrokerCardProps> = ({
  _id,
  fullname,
  email,
  phone,
  location,
  profilePhoto,
  onViewOffers,
  rating,
  ratingCount,
  disabled = false,
}) => {
  return (
    <div className="relative flex flex-col items-center text-center bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
      {rating && (
        <div className="absolute top-2 right-2 flex items-center bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
          <span className="text-yellow-700 font-bold text-sm mr-1">
            {rating}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09L5.49 12.18.98 7.91l6.39-.56L10 1.5l2.63 5.85 6.39.56-4.51 4.27 1.368 5.91z" />
              </svg>
            ))}
          </div>
        </div>
      )}

      <Image
        src={profilePhoto || "/dummyprofile.png"}
        alt="Broker Profile"
        width={100}
        height={100}
        className="rounded-full border-4 border-green-200 object-cover shadow-md"
      />

      <div className="mt-4 space-y-1 text-gray-700 w-full">
        <h2 className="text-xl font-bold text-emerald-800">{fullname}</h2>
        <div className="flex items-center gap-2 text-sm justify-center">
          <Mail className="w-4 h-4 text-gray-500" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm justify-center">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm justify-center">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{location}</span>
        </div>
        {ratingCount !== undefined && (
          <p className="text-xs text-gray-500 mt-1">{ratingCount} reviews</p>
        )}
      </div>

      {!disabled && (
        <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full justify-center">
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => onViewOffers && onViewOffers(_id)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Offers
          </button>
        </div>
      )}
    </div>
  );
};

export default BrokerCard;

// import React from "react";
// import Image from "next/image";
// import { Phone, Mail, MapPin, Eye, MessageSquare } from "lucide-react";

// interface BrokerCardProps {
//   _id: string;
//   fullname: string;
//   email: string;
//   phone: string;
//   location: string;
//   profilePhoto?: string;
//   onViewOffers: (brokerId: string) => void;
//   rating?: number; // ⭐ average rating like 4.8
//   ratingCount?: number; // ⭐ total reviews like 120
// }

// const BrokerCard: React.FC<BrokerCardProps> = ({
//   _id,
//   fullname,
//   email,
//   phone,
//   location,
//   profilePhoto,
//   onViewOffers,
//   rating,
//   ratingCount,
// }) => {
//   return (
//     <div className="relative flex flex-col items-center text-center bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transition-transform transform hover:scale-[1.02] hover:shadow-2xl">
//       {/* ⭐ Rating Badge in Top-Right */}
//       {rating && (
//         <div className="absolute top-2 right-2 flex items-center bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
//           <span className="text-yellow-700 font-bold text-sm mr-1">
//             {rating}
//           </span>
//           <div className="flex items-center">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <svg
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 15l-5.878 3.09L5.49 12.18.98 7.91l6.39-.56L10 1.5l2.63 5.85 6.39.56-4.51 4.27 1.368 5.91z" />
//               </svg>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Profile Image */}
//       <Image
//         src={profilePhoto || "/dummyprofile.png"}
//         alt="Broker Profile"
//         width={100}
//         height={100}
//         className="rounded-full border-4 border-green-200 object-cover shadow-md"
//       />

//       {/* Details */}
//       <div className="mt-4 space-y-1 text-gray-700 w-full">
//         <h2 className="text-xl font-bold text-emerald-800">{fullname}</h2>

//         <div className="flex items-center gap-2 text-sm justify-center">
//           <Mail className="w-4 h-4 text-gray-500" />
//           <span>{email}</span>
//         </div>

//         <div className="flex items-center gap-2 text-sm justify-center">
//           <Phone className="w-4 h-4 text-gray-500" />
//           <span>{phone}</span>
//         </div>

//         <div className="flex items-center gap-2 text-sm justify-center">
//           <MapPin className="w-4 h-4 text-gray-500" />
//           <span>{location}</span>
//         </div>

//         {/* ⭐ Review count (below stars or separately) */}
//         {ratingCount !== undefined && (
//           <p className="text-xs text-gray-500 mt-1">{ratingCount} reviews</p>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full justify-center">
//         <a
//           href={`https://wa.me/${phone}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
//         >
//           <MessageSquare className="w-4 h-4" />
//           WhatsApp
//         </a>

//         <button
//           onClick={() => onViewOffers(_id)}
//           className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
//         >
//           <Eye className="w-4 h-4" />
//           View Offers
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BrokerCard;
