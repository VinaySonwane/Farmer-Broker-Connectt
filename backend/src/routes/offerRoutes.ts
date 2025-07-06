// src/server/routes/offerRoutes.ts
import { Router } from "express";
import {
  createOffer,
  getOffersByBroker,
  getOfferById,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = Router();

// POST /api/offers - Create a new offer
router.post("/", createOffer);

// ✅ GET /api/offers/broker/:brokerId - Get all offers by a specific broker
router.get("/broker/:brokerId", getOffersByBroker);

// GET /api/offers/:id - Get a single offer by ID
router.get("/:id", getOfferById);

// PUT /api/offers/:id - Update an offer
router.put("/:id", updateOffer);

// DELETE /api/offers/:id - Delete an offer
router.delete("/:id", deleteOffer);

export default router;



// // src/server/routes/offerRoutes.ts
// import { Router } from "express";
// import {
//   createOffer,
//   getOffersForListing,
//   getOfferById,
//   updateOffer,
//   deleteOffer,
// } from "../controllers/offerController.js";

// const router = Router();

// // POST /api/offers - Create a new offer
// router.post("/", createOffer);

// // GET /api/offers/:listingId - Get all offers for a specific listing
// router.get("/:listingId", getOffersForListing);

// // GET /api/offers/:id - Get a single offer by ID
// router.get("/:id", getOfferById);

// // PUT /api/offers/:id - Update an offer
// router.put("/:id", updateOffer);

// // DELETE /api/offers/:id - Delete an offer
// router.delete("/:id", deleteOffer);

// export default router;
