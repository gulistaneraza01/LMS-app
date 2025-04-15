import { Webhook } from "svix";

//store user data to DB from clerk
const userClerkWebHooks = async (req, res) => {
  const whook = new Webhook(clerkWEbhookSecret);
  try {
    console.log(req.headers, req.body);
    await whook.verify(req.body, req.headers);

    const { data, action } = req.body;
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid webhook" });
  }
  res.send("hello");
};

export { userClerkWebHooks };
