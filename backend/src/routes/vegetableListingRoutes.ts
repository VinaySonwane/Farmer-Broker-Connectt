// src/server/routes/vegetableListingRoutes.ts
import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  createVegetableListing,
  deleteVegetableListing,
  getAllVegetableListings,
  getVegetableListingById,
  getVegetableListingsByFarmerId,
  updateVegetableListing,
  updateVegetableStatus,
} from "../controllers/vegetableListingController.js";

const router = Router();

// POST /api/vegetable-listings - Create a new vegetable listing
// Use multer's upload.single to handle single image upload
// router.post("/", upload.single("image"), createVegetableListing);
router.post("/", createVegetableListing);

// Add this new route before `/:id`
router.get("/", getVegetableListingsByFarmerId);

// GET /api/vegetable-listings - Get all vegetable listings
router.get("/", getAllVegetableListings);

// GET /api/vegetable-listings/:id - Get a single vegetable listing by ID
router.get("/:id", getVegetableListingById);

// PUT /api/vegetable-listings/:id - Update a vegetable listing
//router.put("/:id", upload.single("image"), updateVegetableListing);
router.put("/:id", updateVegetableListing);

// DELETE /api/vegetable-listings/:id - Delete a vegetable listing
router.delete("/:id", deleteVegetableListing);

// PATCH /api/vegetable-listings/:id/status - Update only status
router.patch("/:id/status", updateVegetableStatus);

export default router;
