import mongoose, { Schema, Document } from "mongoose";

export interface PropertyValues extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  address?: string;
  locationLink?: string;
  images: string[];
  createdAt: Date;
}

const PropertySchema: Schema<PropertyValues> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    address: { type: String },
    locationLink: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<PropertyValues>("Property", PropertySchema);
