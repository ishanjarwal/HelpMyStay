import { RequestHandler } from "express";
import User from "../models/User";
import twilioClient from "../config/twilio";
import model from "../config/gemini";
import { checkIntent } from "../utils/generatePrompts";

export const createUser: RequestHandler = async (req, res) => {
  console.log(req.body);

  const from = req.body.From as string; // "whatsapp:+911234567890"
  const body = (req.body.Body as string).trim().toLowerCase();

  try {
    const check = await User.findOne({ phone: from });

    if (!check) {
      // create the user
      const user = new User({
        name: req.body.ProfileName,
        phone: from,
      });
      await user.save();

      await twilioClient.messages.create({
        from: "whatsapp:+14155238886",
        to: from,
        body: "Welcome, You have been registered",
      });

      res.sendStatus(200);
    } else {
      const prompt = checkIntent(req.body.Body);

      let result = await model.generateContent(prompt);
      const modelResponse = result.response.text();

      console.log(modelResponse);

      await twilioClient.messages.create({
        from: "whatsapp:+14155238886",
        to: from,
        body: modelResponse,
      });
      res.end();
    }
  } catch (error) {
    console.error("User‑create/check error:", error);
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: from,
      body: "Something is off",
    });

    res.end();
  }
};
