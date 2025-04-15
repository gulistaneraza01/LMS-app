import dotenv from "dotenv";
dotenv.config();

const mongoDBUrl = process.env.MONGODB_URL;
const clerkWEbhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export { mongoDBUrl, clerkWEbhookSecret };
