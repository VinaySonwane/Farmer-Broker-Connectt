// src/server/controllers/offerController.ts
import { Request, Response } from "express";
import Offer from "../models/Offer.js";

// Create a new offer for a vegetable listing
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { brokerId, vegetableName, offeredPrice, unit, message, status } =
      req.body;

    const newOffer = new Offer({
      brokerId,
      vegetableName,
      offeredPrice,
      unit,
      message,
      status,
    });

    await newOffer.save();

    return res.status(201).json(newOffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating offer" });
  }
};

// Get all offers for a specific broker
export const getOffersByBroker = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find({ brokerId: req.params.brokerId });
    return res.status(200).json(offers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching broker offers" });
  }
};

// Get a single offer by ID
export const getOfferById = async (req: Request, res: Response) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    return res.status(200).json(offer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching offer" });
  }
};

// Update an offer
export const updateOffer = async (req: Request, res: Response) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedOffer)
      return res.status(404).json({ message: "Offer not found" });

    return res.status(200).json(updatedOffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating offer" });
  }
};

// Delete an offer
export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer)
      return res.status(404).json({ message: "Offer not found" });

    return res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting offer" });
  }
};
