import { Request, Response } from "express";
import Message from "../models/MessageModel.js";
import MessageModel from "../models/MessageModel.js";

// controllers/messageController.ts
export const getMessagesBetweenUsers = async (req: Request, res: Response) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Missing user IDs in query" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ createdAt: 1 });

    // ✅ Always return 200, even if empty
    return res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Failed to fetch messages:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// controllers/messageController.ts
export const saveMessage = async (req: Request, res: Response) => {
  const { sender, recipient, text } = req.body;

  if (!sender || !recipient || !text) {
    return res.status(400).json({ message: "Missing fields in message." });
  }

  try {
    const newMessage = await MessageModel.create({ sender, recipient, text });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to save message", error });
  }
};
