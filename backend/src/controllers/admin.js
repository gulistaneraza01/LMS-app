import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import getDataURI from "../utils/getDataURI.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

// add new Courses
const addCourse = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.auth.userId;
    const { courseData } = req.body;
    const course = JSON.parse(courseData);

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Thumdnail is not attached" });
    }

    course.educator = userId;
    const newCourse = await Course.create(course);

    const base64Data = getDataURI(file);
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: "LMS",
      resource_type: "auto",
    });
    const courseThumbnailUrl = result.secure_url;

    newCourse.courseThumbnail = courseThumbnailUrl;
    await newCourse.save();

    return res
      .status(201)
      .json({ success: true, message: "successfully added course!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//GetEducator Course
const getEducatorCourse = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const courses = await Course.find({ educator: userId });

    return res.json({ status: true, courses });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//dashboard Data
const dashboardData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const courses = await Course.find({ educator: userId });

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    console.log(purchases);

    const totalEarnings = purchases.reduce((acc, cur) => acc + cur.amount, 0);

    const enrolledStudentsData = [];
    for (let course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    const dashboardData = {
      totalCourses: courses.length,
      totalEarnings,
      enrolledStudentsData,
    };

    return res.json({ success: true, dashboardData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//get enrolled data with purchase data
const getEnrolledStudent = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const courses = await Course.find({ educator: userId });

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    console.log(purchases);

    const enrolledStudents = purchases.map((purchase) => {
      return {
        student: purchase.userId,
        courseTitle: purchase.courseId.courseTitle,
        purchaseDate: purchase.createdAt,
      };
    });

    return res.json({ success: true, enrolledStudents });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { addCourse, getEducatorCourse, dashboardData, getEnrolledStudent };
