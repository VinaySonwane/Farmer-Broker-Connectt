import express from "express";
import {
  getMessagesBetweenUsers,
  saveMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getMessagesBetweenUsers); // ?user1=...&user2=...
router.post("/", saveMessage); // Save new message

export default router;
