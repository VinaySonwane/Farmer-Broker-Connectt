import React from "react";

interface Props {
  vegetableName: string;
  offeredPrice: number;
  unit: string;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function VegetableOfferCard({
  vegetableName,
  offeredPrice,
  unit,
  createdAt,
  onEdit,
  onDelete,
}: Props) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition w-full border border-gray-100 relative">
      {/* Action buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full p-1"
              title="Edit Offer"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-100 hover:bg-red-200 text-red-800 rounded-full p-1"
              title="Delete Offer"
            >
              🗑️
            </button>
          )}
        </div>
      )}

      <h3 className="text-xl font-semibold text-green-800">{vegetableName}</h3>
      <p className="text-gray-700 mt-2">
        <span className="text-green-700 font-medium">Offered Price:</span> ₹
        {offeredPrice}/{unit}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        <span className="text-green-600 font-medium">Offered on:</span>{" "}
        {formattedDate}
      </p>
    </div>
  );
}

// // components/utility/VegetableOfferCard.tsx
// import React from "react";

// interface Props {
//   vegetableName: string;
//   offeredPrice: number;
//   unit: string;
//   createdAt: string;
// }

// export default function VegetableOfferCard({
//   vegetableName,
//   offeredPrice,
//   unit,
//   createdAt,
// }: Props) {
//   const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition w-full border border-gray-100">
//       <h3 className="text-xl font-semibold text-green-800">{vegetableName}</h3>
//       <p className="text-gray-700 mt-2">
//         <span className="text-green-700 font-medium">Offered Price:</span> ₹
//         {offeredPrice}/{unit}
//       </p>
//       <p className="text-sm text-gray-600 mt-1">
//         <span className="text-green-600 font-medium">Offered on:</span>{" "}
//         {formattedDate}
//       </p>
//     </div>
//   );
// }
