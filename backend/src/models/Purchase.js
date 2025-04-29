import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "course is required"],
    },
    userId: {
      type: String,
      ref: "User",
      required: [true, "userId is required"],
    },
    amount: { type: Number, required: [true, "amount is required"] },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", schema);
export default Purchase;
