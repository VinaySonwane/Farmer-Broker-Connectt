import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  text: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
