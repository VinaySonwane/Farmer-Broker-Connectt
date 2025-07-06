import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/config/baseURL";

interface RatingFormProps {
  dealId: string;
  ratedBy: string;
  ratedUser: string;
  onSuccess: () => void;
  dealPrice: number;
}

const RatingForm = ({
  dealId,
  ratedBy,
  ratedUser,
  onSuccess,
  dealPrice,
}: RatingFormProps) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [obtainedPrice, setObtainedPrice] = useState(dealPrice);
  const [submitted, setSubmitted] = useState(false); // 👈 Track if rating is already submitted

  useEffect(() => {
    const checkRatingStatus = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/ratings/check/${dealId}?userId=${ratedBy}`
        );
        if (response.data.submitted) {
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Error checking rating status", error);
      }
    };

    checkRatingStatus();
  }, [dealId, ratedBy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/api/ratings`, {
        dealId,
        ratedBy,
        ratedUser,
        rating,
        review,
        obtainedPrice,
      });

      setSubmitted(true); // ✅ Mark as submitted
      onSuccess(); // Call parent callback if needed
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <div>
        <label>Rating (1–5): </label>
        <input
          type="number"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          disabled={submitted} // 👈 Disable after submission
        />
      </div>
      <div>
        <label>Review: </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={submitted} // 👈 Disable after submission
        />
      </div>
      <div>
        <label>Obtained Price (₹): </label>
        <input
          type="number"
          value={obtainedPrice}
          onChange={(e) => setObtainedPrice(Number(e.target.value))}
          required
          disabled={submitted} // 👈 Disable after submission
        />
      </div>
      <button
        type="submit"
        className={`px-3 py-1 rounded text-white ${
          submitted ? "bg-gray-500 cursor-not-allowed" : "bg-green-600"
        }`}
        disabled={submitted}
      >
        {submitted ? "Rating Submitted" : "Submit Rating"}
      </button>
    </form>
  );
};

export default RatingForm;
