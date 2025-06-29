import mongoose, { Schema, Document } from "mongoose";

export interface BookingValues extends Document {
  roomId: mongoose.Types.ObjectId;
  guestName: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  source?: string;
  status: "confirmed" | "cancelled";
  createdAt: Date;
}

const BookingSchema: Schema<BookingValues> = new Schema(
  {
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    guestName: { type: String, required: true },
    guestPhone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    source: { type: String, default: "manual" },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<BookingValues>("Booking", BookingSchema);
