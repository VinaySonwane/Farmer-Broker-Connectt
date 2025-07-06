import express from "express";
import Deal from "../models/Deal.js";
import { Request, Response } from "express";
import { createDeal, getDeals } from "../controllers/dealController.js";

const router = express.Router();

// POST /api/deals — Create a new deal
router.post("/", createDeal);

// GET /api/deals/completed/:userId — Get completed deals for a user
router.get("/completed/:userId", getDeals);

export default router;
