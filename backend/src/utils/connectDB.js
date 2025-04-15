import mongoose from "mongoose";
import { mongoDBUri } from "./constaints.js";

async function connectDB() {
  try {
    await mongoose.connect(mongoDBUri, { dbName: "LMS" });
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log(`Error Connection To MongoDB: ${error}}`);
  }
}

export default connectDB;
