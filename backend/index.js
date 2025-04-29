import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";

//routes
import client from "./src/routes/client.js";
import auth from "./src/routes/auth.js";
import admin from "./src/routes/admin.js";

//utils
import connectDB from "./src/utils/connectDB.js";
import {
  cloudinaryApiKey,
  cloudinaryName,
  cloudinarySecretKey,
} from "./src/utils/constaints.js";
import authenticateAdmin from "./src/middlewares/authenticateAdmin.js";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(cors({ credentials: true, origin: "*" }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
cloudinary.config({
  cloud_name: cloudinaryName,
  api_secret: cloudinarySecretKey,
  api_key: cloudinaryApiKey,
});

//routes
app.use("/api/client", client);
app.use("/api/admin", authenticateAdmin, admin);
app.use("/api/auth", auth);

app.get("/", (req, res) => res.send("backend server is working"));
app.get("/test", (req, res) => {
  console.log("inside main code");
  return res.send("hello");
});

//Server Listening
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Listening On PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
