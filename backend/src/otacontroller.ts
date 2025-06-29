// controllers/otaController.ts
import { Request, Response } from "express";

// Simulate a fake sync to Beds24
export const syncToCoolOTA = async (req: Request, res: Response):Promise<string> => {
  try {
    const { roomId, fromDate, toDate, availability, price } = req.body;

    // Mock response as if from Beds24 API
    console.log(`Syncing to Beds24:
      Room ID: ${roomId}
      From: ${fromDate}
      To: ${toDate}
      Availability: ${availability}
      Price: ${price}`);
    

   return `✅ Synced room ${roomId} to CoolOTA successfully.`
  } catch (err) {
    console.error("CoolOTA Sync Error:", err);
    return "❌ Sync failed";
  }
};
