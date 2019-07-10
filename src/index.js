import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import users from "./routes/users";
import exercises from "./routes/exercises";

// if (!global._babelPolyfill) {
//   require("babel-polyfill");
// }
import "@babel/polyfill";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});

app.use("/exercises", exercises);
app.use("/users", users);

app.use("/", (req, res) => {
  res.send("!!! Welcome to Exercise-Tracker !!!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
