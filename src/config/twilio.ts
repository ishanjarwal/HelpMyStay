import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
// const twilioPhone = process.env.TWILIO_PHONE!;

const client = twilio(accountSid, authToken);

export default client;
