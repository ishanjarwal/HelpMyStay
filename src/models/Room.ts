import mongoose, { Schema, Document } from "mongoose";

export interface RoomValues extends Document {
  propertyId: mongoose.Types.ObjectId;
  name: string;
  type?: string;
  price?: number;
  status: "available" | "blocked";
  images: string[];
  createdAt: Date;
}

const RoomSchema: Schema<RoomValues> = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "blocked"],
      default: "available",
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<RoomValues>("Room", RoomSchema);
