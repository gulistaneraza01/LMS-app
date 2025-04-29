import { Router } from "express";
import { userClerkWebHooks, getUser } from "../controllers/auth.js";

const router = Router();

router.get("/getuser", getUser);
router.post("/userclerkwebhooks", userClerkWebHooks);

export default router;
