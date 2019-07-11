"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await _user.default.find();
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
    const userCreated = new _user.default(req.body);
    await userCreated.save();
    res.send({
      message: "User added"
    });
  } catch (err) {
    next({
      message: "username already exist",
      status: 404
    });
  }
});
var _default = router;
exports.default = _default;