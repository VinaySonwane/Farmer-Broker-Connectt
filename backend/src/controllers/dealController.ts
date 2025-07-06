// src/server/controllers/dealController.ts

import { Request, Response } from "express";
import Deal from "../models/Deal.js";

export const createDeal = async (req: Request, res: Response) => {
  try {
    const { farmerId, brokerId, vegetable, quantity, price } = req.body;

    if (!farmerId || !brokerId || !vegetable || !quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const deal = await Deal.create({
      farmer: farmerId,
      broker: brokerId,
      vegetable,
      quantity,
      price,
      status: "completed",
    });

    return res.status(201).json(deal);
  } catch (err) {
    console.error("Error creating deal:", err);
    return res.status(500).json({ message: "Error creating deal" });
  }
};


export const getDeals = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const deals = await Deal.find({
      status: "completed",
      $or: [{ farmer: userId }, { broker: userId }],
    })
      .populate("farmer", "fullname")
      .populate("broker", "fullname");

    res.status(200).json(deals);
  } catch (err) {
    console.error("Error fetching deals:", err);
    res.status(500).json({ message: "Error fetching deals", error: err });
  }
};
