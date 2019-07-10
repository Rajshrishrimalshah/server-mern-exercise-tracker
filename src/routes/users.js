import express from "express";
import User from "../models/user.model";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();

  try {
    res.json(users);
  } catch (err) {
    res.status(400).json("Error: ", err);
  }
});

router.post("/add", async (req, res) => {
  const userCreated = new User(req.body);
  try {
    await userCreated.save();
    res.send("User added");
  } catch (err) {
    res.status(500).json("Error: ", err);
  }
});

export default router;
