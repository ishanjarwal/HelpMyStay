import { RequestHandler } from "express";
import User from "../models/User";
import twilioClient from "../config/twilio";
import model from "../config/gemini";
import { checkIntent } from "../utils/generatePrompts";
import {
  addProperty,
  addRoom,
  registerNewUser,
  viewProperties,
  viewRooms,
} from "../actions/hostActions";

const availableKeywords = [
  "add_room",
  "add_property",
  "view_bookings",
  "block_room",
  "change_rate",
  "unblock_room",
  "weekly_analytics",
  "daily_analytics",
  "view_properties",
  "view_rooms",
  "register_user",
] as const;

export const handleRequest: RequestHandler = async (req, res) => {
  console.log(req.body);

  const from = req.body.From as string; // "whatsapp:+911234567890"
  const body = (req.body.Body as string).trim().toLowerCase();

  const greeings = ["hi", "hello", "hey"];

  if (greeings.some((el) => body.includes(el))) {
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: from,
      body: "Hey there, How may I assist your, Should I register you as a user ?",
    });
    res.end();
    return;
  }

  let message = "";
  try {
    const prompt = checkIntent(body, from);
    let result = await model.generateContent(prompt);
    const modelResponse = JSON.parse(result.response.text()) as {
      intent: (typeof availableKeywords)[number];
      data: any;
    };

    console.log(modelResponse);

    switch (modelResponse?.intent) {
      case "add_room":
        message = await addRoom(modelResponse.data);
        break;
      case "view_rooms":
        message = await viewRooms(modelResponse.data?.property_name as string);
        break;
      case "view_properties":
        message = await viewProperties();
        break;
      case "add_property":
        message = await addProperty(modelResponse.data);
        break;
      case "register_user":
        message = await registerNewUser(modelResponse.data);
        break;
      default:
        throw new Error("Unrecognized intent");
        break;
    }

    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: from,
      body: message,
    });

    res.end();
  } catch (error) {
    console.error(error);
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: from,
      body: `
❓Sorry, I didn’t catch that. You can try:
“Add my property”
“Update room price”
“Show my current bookings”
"Show weekly analytics"
`,
    });

    res.end();
  }
};
