import { clerkClient } from "@clerk/express";

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
    return res.status(403).json({ success: false, message: error.message });
  }
};

// getAllCourses
const getAllCourses = async (req, res) => {};

export { getAllCourses, becomeAdmin };
