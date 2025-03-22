import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("❌ MongoDB URL is missing in environment variables!");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn; // Return existing connection

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL)
      .then((mongoose) => {
        console.log("✅ Database connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ Database connection error:", err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
