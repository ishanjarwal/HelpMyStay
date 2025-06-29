// controllers/otaController.ts
import { Request, Response } from "express";

// Simulate a fake sync to Beds24
export const syncToBeds24 = async (req: Request, res: Response):Promise<string> => {
  try {
    const { roomId, fromDate, toDate, availability, price } = req.body;

    // Mock response as if from Beds24 API
    console.log(`Syncing to Beds24:
      Room ID: ${roomId}
      From: ${fromDate}
      To: ${toDate}
      Availability: ${availability}
      Price: ${price}`);
    

   return `✅ Synced room ${roomId} to Beds24 successfully.`
  } catch (err) {
    console.error("Beds24 Sync Error:", err);
    return "❌ Sync failed";
  }
};
