import { Router } from "express";
import { userClerkWebHooks } from "../controllers/auth.js";

const router = Router();

router.post("/userclerkwebhooks", userClerkWebHooks);

export default router;
