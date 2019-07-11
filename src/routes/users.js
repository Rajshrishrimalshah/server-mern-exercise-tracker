import express from "express";
import User from "../models/user.model";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next({
      message: "No record found",
      status: 404
    });
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const userCreated = new User(req.body);
    await userCreated.save();
    res.send({ message: "User added" });
  } catch (err) {
    next({
      message: "username already exist",
      status: 404
    });
  }
});

export default router;
