import { Router } from "express";
import {
  addTestimonial,
  becomeAdmin,
  getAllCourses,
  getCourseById,
  getTestimonial,
  purchaseCourse,
  studentEnrolledCourse,
} from "../controllers/client.js";

const router = Router();

router.get("/becomeadmin", becomeAdmin);
router.get("/getcourses", getAllCourses);
router.get("/getcourses/:id", getCourseById);
router.get("/gettestimonial", getTestimonial);
router.get("/studentenrolledcourse", studentEnrolledCourse);
router.post("/purchasecourse", purchaseCourse);
router.post("/addtestimonial", addTestimonial);

export default router;
