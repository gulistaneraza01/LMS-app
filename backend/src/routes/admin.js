import { Router } from "express";
import {
  addCourse,
  dashboardData,
  getEducatorCourse,
  getEnrolledStudent,
} from "../controllers/admin.js";
import upload from "../utils/upload.js";

const router = new Router();

router.get("/geteducatorcourse", getEducatorCourse);
router.get("/dashboarddata", dashboardData);
router.get("/getenrolledstudent", getEnrolledStudent);
router.post("/addcourse", upload.single("file"), addCourse);

export default router;
