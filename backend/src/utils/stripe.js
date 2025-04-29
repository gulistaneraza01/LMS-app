import Stripe from "stripe";
import { stripeSecretKey } from "./constaints";

const stripe = new Stripe(stripeSecretKey);

export default stripe;
