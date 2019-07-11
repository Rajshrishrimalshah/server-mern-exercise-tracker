"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _exercise = _interopRequireDefault(require("../models/exercise.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); //Read all Collection from database


router.get("/", async (req, res) => {
  const Exercises = await _exercise.default.find();

  try {
    res.json(Exercises);
  } catch (err) {
    res.status(400).json("Error: ", err);
  }
}); //Create collection inside database

router.post("/add", async (req, res) => {
  const {
    username,
    description
  } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercises = new _exercise.default({
    username,
    description,
    duration,
    date
  });

  try {
    await newExercises.save();
    res.send("Exercise added successfully !");
  } catch (err) {
    res.status(500).json("Error: ", err);
  }
}); //Get collection By ID

router.get("/:id", async (req, res) => {
  try {
    const exercise = await _exercise.default.findById(req.params.id);
    if (!exercise) res.status(404).send("No item found");
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).send(err);
  }
}); //Delete collection By ID

router.delete("/:id", async (req, res) => {
  try {
    const exercise = await _exercise.default.findByIdAndDelete(req.params.id);
    if (!exercise) res.status(404).send("No item found");
    res.status(200).json("Exercise deleted successfully !");
  } catch (err) {
    res.status(500).send(err);
  }
}); //Update collection By ID

router.patch("/:id", async (req, res) => {
  try {
    await _exercise.default.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Exercise updated successfully !");
  } catch (err) {
    res.status(500).send(err);
  } //Update collection using another method
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
var _default = router;
exports.default = _default;