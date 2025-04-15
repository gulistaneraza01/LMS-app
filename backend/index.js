import express from "express";
import cors from "cors";

//routes
import client from "./src/routes/client.js";
import auth from "./src/routes/auth.js";

//utils
import connectDB from "./src/utils/connectDB.js";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
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
