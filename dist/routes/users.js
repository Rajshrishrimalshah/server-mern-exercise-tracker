"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  const users = await _user.default.find();

  try {
    res.json(users);
  } catch (err) {
    res.status(400).json("Error: ", err);
  }
});
router.post("/add", async (req, res) => {
  const userCreated = new _user.default(req.body);

  try {
    await userCreated.save();
    res.send("User added");
  } catch (err) {
    res.status(500).json("Error: ", err);
  }
});
var _default = router;
exports.default = _default;