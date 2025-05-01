import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "userId is required"] },
    courseId: { type: String, required: [true, "courseId is required"] },
    completed: { type: Boolean, default: false },
    lectureCompleted: [],
  },
  { timestamps: true, minimize: false }
);

const CourseProgress =
  mongoose.models.CourseProgress || mongoose.model("CourseProgress", schema);

export default CourseProgress;
