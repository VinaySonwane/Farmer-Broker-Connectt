// src/server/models/Offer.ts

import mongoose, { Schema, Document, Types } from "mongoose";

// 1. Define the Interface
export interface IOffer extends Document {
  // listingId: Types.ObjectId;
  vegetableName: string;
  brokerId: Types.ObjectId;
  offeredPrice: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

// 2. Create the Schema
const OfferSchema: Schema<IOffer> = new Schema({
  // listingId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "VegetableListing",
  //   required: true,
  // },
  vegetableName: { type: String, required: true },
  brokerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offeredPrice: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Export the model
export default mongoose.model<IOffer>("Offer", OfferSchema);
