import express from "express";
import connectDB from "./src/utils/connectDB.js";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

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
