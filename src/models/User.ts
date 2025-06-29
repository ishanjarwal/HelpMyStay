// models/User.js
import mongoose, { Document } from "mongoose";

export interface UserValues extends Document {
  phone: string;
  name: string;
  language: string;
}

const userSchema = new mongoose.Schema<UserValues>(
  {
    phone: { type: String, required: true, unique: true }, // WhatsApp numbers
    name: { type: String },
    language: { type: String, default: "en" },
  },
  { timestamps: true }
);
const User = mongoose.model<UserValues>("User", userSchema);
export default User;
