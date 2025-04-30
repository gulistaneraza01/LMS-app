import Stripe from "stripe";
import { stripeSecretKey } from "../utils/constaints.js";

const stripeInstance = new Stripe(stripeSecretKey);

export default stripeInstance;
