import { Router } from "express";
import { getAllCourses } from "../controllers/client.js";

const router = Router();

router.get("/courses", getAllCourses);

export default router;
