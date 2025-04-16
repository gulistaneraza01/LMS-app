import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;
const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;
const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

export { mongoDBUri, clerkWebhookSecret, clerkPublishableKey, clerkSecretKey };
