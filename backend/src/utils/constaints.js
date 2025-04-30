import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;
const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;
const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const cloudinaryName = process.env.CLOUDINARY_NAME;
const cloudinarySecretKey = process.env.CLOUDINARY_SECRET_KEY;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const currency = process.env.CURRENCY;

export {
  mongoDBUri,
  clerkWebhookSecret,
  clerkPublishableKey,
  clerkSecretKey,
  cloudinaryName,
  cloudinarySecretKey,
  cloudinaryApiKey,
  stripePublishableKey,
  stripeSecretKey,
  currency,
  stripeWebhookSecret,
};
