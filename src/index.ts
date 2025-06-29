import express, { Request, RequestHandler, Response } from "express";
import connectDB from "./utils/connectdb";
import dotenv from "dotenv";
import { createUser } from "./controllers/User";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB(process.env.DB_URL as string);
app.post("/", createUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//oh hello there