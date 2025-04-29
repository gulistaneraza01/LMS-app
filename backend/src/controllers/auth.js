import { Webhook } from "svix";
import User from "../models/user.js";
import { clerkWebhookSecret } from "../utils/constaints.js";

//store user data to DB from clerk
const userClerkWebHooks = async (req, res) => {
  console.log("inside cleark called");
  try {
    const wbhooks = new Webhook(clerkWebhookSecret);
    await wbhooks.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const newUser = {
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };
        await User.create(newUser);
        return res.status(201).json({ success: true, message: "user created" });
      }

      case "user.updated": {
        const updateUser = {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, updateUser);
        return res.json({ success: true, message: "user updated" });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true, message: "user deleted" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

//get user data
const getUser = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { userClerkWebHooks, getUser };
