import mongoose, { Schema, Document } from "mongoose";

export interface PropertyValues extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  address?: string;
  locationLink?: string;
  images: string[];
  createdAt: Date;
}

const PropertySchema: Schema<PropertyValues> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address: { type: String },
    locationLink: { type: String },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<PropertyValues>("Property", PropertySchema);
