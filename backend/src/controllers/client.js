import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import Testimonial from "../models/Testimonial.js";
import Purchase from "../models/Purchase.js";
import Stripe from "stripe";
import { currency, stripeWebhookSecret } from "../utils/constaints.js";
import User from "../models/User.js";
import stripeInstance from "../config/stripInstance.js";

//become Admin
const becomeAdmin = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "admin",
      },
    });

    return res.json({ success: true, message: "updated to Admin" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//allCoursedata
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select("-courseContent -enrolledStudents")
      .populate({ path: "educator" });
    return res.json({ status: true, courses });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//get course by id
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = await Course.findById(id).populate({ path: "educator" });

    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    return res.json({ success: true, courseData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//student enrolled with lecture link
const studentEnrolledCourse = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    return res.json({
      success: true,
      enrolledCouses: userData.enrolledCourses,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//addtestimonial
const addTestimonial = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { role, rating, feedback } = req.body;
    const testimonial = { userId, role, rating, feedback };
    await Testimonial.create(testimonial);
    return res.json({ status: true, message: "thank you for giving rating" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//getTestimonial
const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.find().populate({
      path: "educator",
      select: "name imageUrl",
    });
    const testimonialData = testimonial.map((e) => {
      return { ...e, image: e.imageUrl };
    });

    res.json({ status: true, testimonialData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//purchasecourse
const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const { userId } = req.auth;

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.status(400).json({
        success: false,
        message: "Data not Found",
      });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId: userData._id,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    //stripe gateway init

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchase.amount * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/myEnrollment`,
      cancel_url: `${origin}/`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//verifyPayment  stripe webhook
const verifyPayment = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(event);
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      console.log("inside true", { paymentIntent, session });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(
        purchaseData.courseId.toString()
      );

      courseData.enrolledStudents.push(courseData);
      await courseData.save();

      userData.enrolledCourses.push(courseData.id);
      await userData.save();

      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }

    case "payment_method.payment_failed": {
      const paymentIntant = event.data.object;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntant.id,
      });

      const { purchaseId } = session.data[0].metadata;

      await Purchase.findByIdAndUpdate(purchaseId, { status: "failed" });

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

export {
  becomeAdmin,
  getAllCourses,
  addTestimonial,
  getTestimonial,
  getCourseById,
  studentEnrolledCourse,
  purchaseCourse,
  verifyPayment,
};
