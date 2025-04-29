import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "id is required"] },
    name: { type: String, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"] },
    imageUrl: { type: String, required: [true, "profile pis  is required"] },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

export default User;
