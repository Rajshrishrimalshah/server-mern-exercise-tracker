import express from "express";
import Exercise from "../models/exercise.model";

const router = express.Router();

//Read all Collection from database
router.get("/", async (req, res) => {
  const Exercises = await Exercise.find();

  try {
    res.json(Exercises);
  } catch (err) {
    res.status(400).json("Error: ", err);
  }
});

//Create collection inside database
router.post("/add", async (req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercises = new Exercise({ username, description, duration, date });

  try {
    await newExercises.save();
    res.send("Exercise added successfully !");
  } catch (err) {
    res.status(500).json("Error: ", err);
  }
});

//Get collection By ID
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) res.status(404).send("No item found");
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete collection By ID
router.delete("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) res.status(404).send("No item found");
    res.status(200).json("Exercise deleted successfully !");
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update collection By ID

router.patch("/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Exercise updated successfully !");
  } catch (err) {
    res.status(500).send(err);
  }

  //Update collection using another method
  // Exercise.findById(req.param.id)
  //   .then(exercise => {
  //     exercise.username = req.body.username;
  //     exercise.description = req.body.description;
  //     exercise.duration = Number(req.body.duration);
  //     exercise.date = Date.parse(req.body.date);

  //     exercise
  //       .save()
  //       .then(() => res.json("Exercise updated !"))
  //       .catch(err => res.status(404).json("Error: ", err));
  //   })
  //   .catch(err => res.status(404).json("Error: ", err));
});

export default router;
