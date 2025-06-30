
import { Request, Response } from "express";

// Simulating a sync to OTA API!!!!
export const syncToCoolOTA = async (data:any):Promise<string> => {
  try {
    const { roomId, fromDate, toDate, availability, price } = data;

    // Response
    console.log(`Syncing to CoolOTA:
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
