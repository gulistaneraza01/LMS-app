import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: [true, "lectureId is required"] },
    lectureTitle: {
      type: String,
      required: [true, "lectureTitle is required"],
    },
    lectureDuration: {
      type: Number,
      required: [true, "lectureDuration is required"],
    },
    lectureUrl: { type: String, required: [true, "lectureUrl is required"] },
    isPreviewFree: { type: Boolean, require: true },
    lectureOrder: {
      type: Number,
      required: [true, "lectureOrder is required"],
    },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: [true, "chapterId is required"] },
    chapterOrder: {
      type: Number,
      required: [true, "chapterOrder is required"],
    },
    chapterTitle: {
      type: String,
      required: [true, "chapterTitle is required"],
    },
    chapterContent: [lectureSchema],
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: [true, "courseTitle is required"] },
    courseDescription: {
      type: String,
      required: [true, "courseDescription is required"],
    },
    courseThumbnail: { type: String },
    coursePrice: {
      type: Number,
      required: [true, "coursePrice is required"],
    },
    isPublished: { type: Boolean, default: true },
    discount: {
      type: Number,
      required: [true, "discount is required"],
      min: 0,
      max: 100,
    },
    courseRatings: [
      {
        userId: { type: String },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],

    courseContent: [chapterSchema],
    educator: {
      type: String,
      ref: "User",
      required: [true, "education is required"],
    },
    enrolledStudents: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false }
);

const Course = mongoose.models.Course || mongoose.model("Course", schema);

export default Course;
