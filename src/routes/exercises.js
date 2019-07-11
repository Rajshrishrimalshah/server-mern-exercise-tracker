import express from "express";
import Exercise from "../models/exercise.model";

const router = express.Router();

//Read all Collection from database
router.get("/", async (req, res, next) => {
  try {
    const Exercises = await Exercise.find();
    res.json(Exercises);
  } catch (err) {
    next({
      message: "Exercises does not exist",
      status: 404
    });
  }
});

//Create collection inside database
router.post("/add", async (req, res, next) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercises = new Exercise({ username, description, duration, date });

  try {
    const exercise = await newExercises.save();

    if (!exercise)
      next({
        message: "exercise already exist",
        status: 404
      });

    res.send({ message: " create successfully !" });
  } catch (err) {
    next({
      message: "Unknown server error",
      status: 500
    });
  }
});

//Get collection By ID
router.get("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise)
      next({
        message: "No record found",
        status: 404
      });

    res.status(200).json(exercise);
  } catch (err) {
    next({
      message: "'Unknown server error",
      status: 500
    });
  }
});

//Delete collection By ID
router.delete("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndRemove(req.params.id);

    if (!exercise)
      next({
        message: "No record found",
        status: 404
      });

    res.status(200).json({ message: " delete successfully !" });
  } catch (err) {
    next({
      message: "'Unknown server error",
      status: 404
    });
  }
});

//Update collection By ID

router.patch("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body);

    if (!exercise) {
      next({
        message: "No record found",
        status: 404
      });
    } else {
      res.status(200).send({ message: " update successfully !" });
    }
  } catch (err) {
    next({
      message: "'Unknown server error",
      status: 500
    });
  }
});

export default router;
