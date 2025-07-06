import express from "express";
import {
  addRating,
  checkRatingSubmitted,
  getRatingsForUser,
} from "../controllers/ratingController.js";
const router = express.Router();

router.post("/", addRating);
router.get("/:userId", getRatingsForUser);
router.get("/check/:dealId", checkRatingSubmitted);

export default router;
