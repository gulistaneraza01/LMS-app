import { Webhook } from "svix";
import User from "../models/user.js";
import { clerkWebhookSecret } from "../utils/constaints.js";

//store user data to DB from clerk
const userClerkWebHooks = async (req, res) => {
  const whook = new Webhook(clerkWebhookSecret);
  try {
    await whook.verify(req.body, req.headers);

    const { data, action } = req.body;

    switch (action) {
      case "user.created": {
        const _id = data.id;
        const name = `${data.first_name} ${data.last_name}`;
        const email = data.email_addresses[0].email_address;
        const imageUrl = data.image_url;
        const newUser = { _id, name, email, imageUrl };
        await User.create(newUser);
        res.json({ success: true, message: "user created" });
        break;
      }

      case "user.updated": {
        const name = `${data.first_name} ${data.last_name}`;
        const email = data.email_addresses[0].email_address;
        const imageUrl = data.image_url;
        const updateUser = { name, email, imageUrl };
        await User.findByIdAndUpdate(data.id, updateUser);
        res.json({ success: true, message: "user updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "user deleted" });
        break;
      }

      default:
        break;
    }

    return res.json({ header: req.headers, body: req.body, success: true });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid webhook" });
  }
  res.send("hello");
};

export { userClerkWebHooks };
