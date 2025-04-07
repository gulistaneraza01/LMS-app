import dotenv from "dotenv";
dotenv.config();

const mongoDBUri = process.env.MONGODB_URI;

export { mongoDBUri };
