// src/server/routes/userRoutes.ts

import { Router } from "express";
import {
  createUser,
  getUsersByRole,
  loginUser,
} from "../controllers/userController.js";

import { getAllBrokers, getAllFarmers } from "../controllers/userController.js";

const router = Router();

// POST /api/users/register
router.post("/register", createUser);

// POST /api/users/login
router.post("/login", loginUser);

// GET /api/users?role=farmer or ?role=broker
router.get("/", getUsersByRole);

//for Chatting

router.get("/brokers", getAllBrokers); // For farmers to see brokers
router.get("/farmers", getAllFarmers); // For brokers to see farmers

export default router;
