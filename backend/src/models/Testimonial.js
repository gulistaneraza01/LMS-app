import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: [true, "userId is required"],
    },
    role: { type: String, required: [true, "role is required"] },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
      required: [true, "rating is required"],
    },
    feedback: { type: String, required: [true, "feedback is required"] },
  },
  { timestamps: true }
);

const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", schema);

export default Testimonial;
