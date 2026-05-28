import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

const app = express();
const port = process.env.PORT || 5050;

// Security Middleware
app.use(helmet());
app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
app.use("/api", apiLimiter);

// Database Connection Logic
async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI missing. Contact messages will be logged only.");
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log("MongoDB connection failed. Contact messages will be logged only.");
    console.log(error.message);
    return false;
  }
}

const databaseConnected = await connectDatabase();
app.set("databaseConnected", databaseConnected);

// Routes
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Portfolio API running on http://127.0.0.1:${port}`);
});
