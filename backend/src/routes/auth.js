import { Router } from "express";
import { userClerkWebHooks } from "../controllers/auth.js";

const router = Router();

router.get("/userclerkwebhooks", userClerkWebHooks);

export default router;
