// import { Request, Response } from "express";
// import Rating from "../models/Rating.js";
// import Deal from "../models/Deal.js";

// export const addRating = async (req: Request, res: Response) => {
//   try {

//     const { dealId, ratedBy, ratedUser, rating, review, obtainedPrice } =
//       req.body;

//     const deal = await Deal.findById(dealId);
//     if (!deal || deal.status !== "completed") {
//       return res.status(400).json({ message: "Invalid or incomplete deal" });
//     }

//     const existingRating = await Rating.findOne({ dealId, ratedBy });
//     if (existingRating) {
//       return res.status(400).json({ message: "Rating already submitted" });
//     }

//     const newRating = await Rating.create({
//       dealId,
//       ratedBy,
//       ratedUser,
//       rating,
//       review,
//       obtainedPrice,
//     });

//     res.status(201).json(newRating);
//   } catch (error) {
//     res.status(500).json({ message: "Error submitting rating", error });
//   }
// };

// export const getRatingsForUser = async (req: Request, res: Response) => {
//   try {
//     const ratings = await Rating.find({
//       ratedUser: req.params.userId,
//     }).populate("ratedBy", "fullname");
//     res.status(200).json(ratings);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching ratings", error });
//   }
// };

import { Request, Response } from "express";
import Rating from "../models/Rating.js";
import Deal from "../models/Deal.js";

export const addRating = async (req: Request, res: Response) => {
  try {
    const { dealId, ratedBy, ratedUser, rating, review, obtainedPrice } =
      req.body;

    // // Check individual fields
    // console.log("🧾 dealId:", dealId);
    // console.log("👤 ratedBy:", ratedBy);
    // console.log("👤 ratedUser:", ratedUser);
    // console.log("⭐ rating:", rating);
    // console.log("📝 review:", review);
    // console.log("💰 obtainedPrice:", obtainedPrice);

    // Validate required fields
    if (
      !dealId ||
      !ratedBy ||
      !ratedUser ||
      rating == null ||
      !review ||
      obtainedPrice == null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const deal = await Deal.findById(dealId);

    if (!deal || deal.status !== "completed") {
      return res.status(400).json({ message: "Invalid or incomplete deal" });
    }

    const existingRating = await Rating.findOne({ dealId, ratedBy });
    //console.log("🔁 Existing rating:", existingRating);

    if (existingRating) {
      return res.status(400).json({ message: "Rating already submitted" });
    }

    const newRating = await Rating.create({
      dealId,
      ratedBy,
      ratedUser,
      rating,
      review,
      obtainedPrice,
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error("🔥 Error in addRating:", error);
    res.status(500).json({ message: "Error submitting rating", error });
  }
};

export const getRatingsForUser = async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.find({
      ratedUser: req.params.userId,
    }).populate("ratedBy", "fullname");

    const averageRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

    res.status(200).json({
      averageRating: parseFloat(averageRating.toFixed(1)),
      count: ratings.length,
      ratings,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ratings", error });
  }
};

export const checkRatingSubmitted = async (req: Request, res: Response) => {
  try {
    const { dealId } = req.params;
    const { userId } = req.query; // who is rating

    if (!dealId || !userId) {
      return res.status(400).json({ message: "Missing dealId or userId" });
    }

    const existingRating = await Rating.findOne({ dealId, ratedBy: userId });

    if (existingRating) {
      return res.status(200).json({ submitted: true });
    } else {
      return res.status(200).json({ submitted: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking rating status", error });
  }
};


// export const checkRatingSubmitted = async (req: Request, res: Response) => {
//   try {
//     const { dealId } = req.params;
//     const { userId } = req.query;

//     console.log("🔥 Received:", { dealId, userId });

//     if (!dealId || !userId) {
//       return res.status(400).json({ message: "Missing dealId or userId" });
//     }

//     const existingRating = await Rating.findOne({
//       dealId,
//       ratedBy: userId.toString(),
//     });

//     console.log("📌 existingRating", existingRating);

//     if (existingRating) {
//       return res.status(200).json({ submitted: true });
//     } else {
//       return res.status(200).json({ submitted: false });
//     }
//   } catch (error) {
//     console.error("❌ Error in checkRatingSubmitted:", error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };
