// src/server/controllers/vegetableListingController.ts
import { Request, Response } from "express";
import VegetableListing from "../models/VegetableListing.js";

// Create a new vegetable listing
export const createVegetableListing = async (req: Request, res: Response) => {
  try {
    const {
      farmerId,
      vegetableName,
      quantity,
      expectedPrice,
      status,
      imageUrl,
    } = req.body;

    // Get the image URL from the uploaded file
    //const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the new vegetable listing
    const newListing = new VegetableListing({
      farmerId,
      vegetableName,
      quantity,
      expectedPrice,
      status,
      imageUrl, // Store the image URL
    });

    // Save the new listing in the database
    await newListing.save();

    return res.status(201).json(newListing);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error creating vegetable listing" });
  }
};
// Get all vegetable listings of Particular Farmner.
export const getVegetableListingsByFarmerId = async (
  req: Request,
  res: Response
) => {
  try {
    const { farmerId } = req.query;

    if (!farmerId) {
      return res.status(400).json({ message: "Farmer ID is required" });
    }

    const listings = await VegetableListing.find({ farmerId });
    return res.status(200).json(listings);
  } catch (err) {
    console.error("Error fetching listings by farmer ID:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// Get all vegetable listings
export const getAllVegetableListings = async (req: Request, res: Response) => {
  try {
    const listings = await VegetableListing.find();
    return res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching vegetable listings" });
  }
};

// Get a single vegetable listing by ID
export const getVegetableListingById = async (req: Request, res: Response) => {
  try {
    const listing = await VegetableListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    //console.log(listing);
    return res.status(200).json(listing);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching vegetable listing" });
  }
};

// Update a vegetable listing
export const updateVegetableListing = async (req: Request, res: Response) => {
  try {
    // If a new file is uploaded, get the image URL
    //const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const { imageUrl } = req.body;
    // Find and update the vegetable listing

    const updatedListing = await VegetableListing.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrl },
      { new: true }
    );
    if (!updatedListing)
      return res.status(404).json({ message: "Listing not found" });

    return res.status(200).json(updatedListing);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error updating vegetable listing" });
  }
};
// Delete a vegetable listing
export const deleteVegetableListing = async (req: Request, res: Response) => {
  try {
    const deletedListing = await VegetableListing.findByIdAndDelete(
      req.params.id
    );
    if (!deletedListing)
      return res.status(404).json({ message: "Listing not found" });

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error deleting vegetable listing" });
  }
};

export const updateVegetableStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const validStatuses = ["active", "sold", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await VegetableListing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating vegetable status:", err);
    return res.status(500).json({
      message: "Error updating vegetable status",
      error: err,
    });
  }
};
