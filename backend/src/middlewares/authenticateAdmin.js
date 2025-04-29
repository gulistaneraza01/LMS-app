import { clerkClient } from "@clerk/express";

const authenticateAdmin = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const userInfo = await clerkClient.users.getUser(userId);
    const role = userInfo.publicMetadata.role;

    if (role === "admin") {
      return next();
    }

    return res
      .status(400)
      .json({ success: false, mesage: "only admin can add the course" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      mesage: "only admin can add the course",
    });
  }
};

export default authenticateAdmin;
