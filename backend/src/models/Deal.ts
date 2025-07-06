import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDeal extends Document {
  farmer: Types.ObjectId;
  broker: Types.ObjectId;
  vegetable: string; // ✅ Only name
  quantity: number;
  price: number;
  status: "completed";
  createdAt: Date;
}

const DealSchema: Schema<IDeal> = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  broker: { type: Schema.Types.ObjectId, ref: "User", required: true },
  vegetable: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["completed"], default: "completed" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDeal>("Deal", DealSchema);
