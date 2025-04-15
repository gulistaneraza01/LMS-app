import { Webhook } from "svix";
import User from "../models/user.js";
import { clerkWebhookSecret } from "../utils/constaints.js";

//store user data to DB from clerk
const userClerkWebHooks = async (req, res) => {
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
        const newUserData = {
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
        };
        const newUser = new User(newUserData);
        const doc = await newUser.save();
        res.status(201).json({ doc });
        break;
      }
      case "user.updated": {
        const newUserData = {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
        };
        const query = User.findOneAndUpdate({ clerkId: data.id }, newUserData);
        const doc = await query.exec();
        res.status(201).json({ doc });
        break;
      }
      case "user.deleted": {
        const query = User.findOneAndDelete({ clerkId: data.id });
        const doc = await query.exec();
        res.status(201).json({ doc });
        break;
      }
    }
    console.log(req.headers, req.body);
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
  // const whook = new Webhook(clerkWebhookSecret);
  // try {
  //   await whook.verify(req.body, req.headers);

  //   const { data, action } = req.body;

  //   switch (action) {
  //     case "user.created": {
  //       const _id = data.id;
  //       const name = `${data.first_name} ${data.last_name}`;
  //       const email = data.email_addresses[0].email_address;
  //       const imageUrl = data.image_url;
  //       const newUser = { _id, name, email, imageUrl };
  //       await User.create(newUser);
  //       res.json({ success: true, message: "user created" });
  //       break;
  //     }

  //     case "user.updated": {
  //       const name = `${data.first_name} ${data.last_name}`;
  //       const email = data.email_addresses[0].email_address;
  //       const imageUrl = data.image_url;
  //       const updateUser = { name, email, imageUrl };
  //       await User.findByIdAndUpdate(data.id, updateUser);
  //       res.json({ success: true, message: "user updated" });
  //       break;
  //     }

  //     case "user.deleted": {
  //       await User.findByIdAndDelete(data.id);
  //       res.json({ success: true, message: "user deleted" });
  //       break;
  //     }

  //     default:
  //       break;
  //   }

  //   return res.json({ header: req.headers, body: req.body, success: true });
  // } catch (error) {
  //   return res.status(400).json({ success: false, message: "Invalid webhook" });
  // }
};

export { userClerkWebHooks };
