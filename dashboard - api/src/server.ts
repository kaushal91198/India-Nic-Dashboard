// src/server.ts
import app from "./app";
import mongoose from "mongoose";
import { connectRedis } from "./services/redis.service";
import dotenv from "dotenv";

dotenv.config();

const PORT = 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth-db";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Connect to Redis using our helper function
    await connectRedis();
    console.log("Connected to Redis");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
