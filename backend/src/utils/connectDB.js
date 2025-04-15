import mongoose from "mongoose";
import { mongoDBUrl } from "./constaints.js";

async function connectDB() {
  try {
    await mongoose.connect(mongoDBUrl, { dbName: "LMS" });
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(`Error Connection To MongoDB: ${error}}`);
  }
}

export default connectDB;
