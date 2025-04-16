import { Router } from "express";
import { becomeAdmin, getAllCourses } from "../controllers/client.js";

const router = Router();

router.get("/becomeadmin", becomeAdmin);
router.get("/courses", getAllCourses);

export default router;
