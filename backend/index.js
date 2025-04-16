import express from "express";
import cors from "cors";

//routes
import client from "./src/routes/client.js";
import auth from "./src/routes/auth.js";

//utils
import connectDB from "./src/utils/connectDB.js";
import { becomeAdmin } from "./src/controllers/client.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(cors({ credentials: true, origin: "*" }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/client", client);
app.use("/api/auth", auth);

app.get("/", (req, res) => res.send("backend server is working"));

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
