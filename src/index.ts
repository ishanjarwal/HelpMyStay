import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { handleRequest } from "./controllers/User";
import connectDB from "./utils/connectdb";
import axios from "axios";
import twilioClient from "./config/twilio";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB(process.env.DB_URL as string);

app.get("/", async (req, res) => {
  try {
    console.log("test");
    await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919116080979",
      body: "",
    });

    res.status(200).json({ message: "hello" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/", handleRequest);

app.get("/webhook", (req, res) => {
  console.log("Webhook test request initiated");

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === (process.env.VERIFY_TOKEN as string)) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (data.object) {
      const messages = data.entry?.[0]?.changes?.[0]?.value?.messages;

      if (messages) {
        const msg = messages[0];
        const from = msg.from; // user's WhatsApp ID (phone number)
        const body = msg.text?.body;

        console.log("💬 Message from", from, ":", body);

        // Send a reply
        await axios.post(
          "https://graph.facebook.com/v23.0/755243627663429/messages",
          {
            messaging_product: "whatsapp",
            to: from,
            text: { body: "👋 Hello! We received your message." },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN as string}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error in webhook handler:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//oh hello there
