import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;
const clerkWEbhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export { mongoDBUri, clerkWEbhookSecret };
