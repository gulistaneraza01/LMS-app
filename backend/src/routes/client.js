import { Router } from "express";
import {
  addCourseRating,
  addTestimonial,
  becomeAdmin,
  getAllCourses,
  getCourseById,
  getCourseProgress,
  getTestimonial,
  purchaseCourse,
  studentEnrolledCourse,
  updateCourseProgress,
} from "../controllers/client.js";

const router = Router();

router.get("/becomeadmin", becomeAdmin);
router.get("/getcourses", getAllCourses);
router.get("/getcourses/:id", getCourseById);
router.get("/studentenrolledcourse", studentEnrolledCourse);

router.post("/getcourseprogress", getCourseProgress);
router.post("/updatecourseprogress", updateCourseProgress);

router.post("/purchasecourse", purchaseCourse);

router.post("/addcourserating", addCourseRating);

router.get("/gettestimonial", getTestimonial);
router.post("/addtestimonial", addTestimonial);

export default router;
