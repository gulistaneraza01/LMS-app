import { Router } from "express";
import { userClerkWebHooks, getUser } from "../controllers/auth.js";

const router = Router();

router.get("/getuser", getUser);
router.post("/userclerk", userClerkWebHooks);

export default router;
