"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _users = _interopRequireDefault(require("./routes/users"));

var _exercises = _interopRequireDefault(require("./routes/exercises"));

var _errorHandler = require("./routes/errorHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const connection = _mongoose.default.connection;
app.use((0, _cors.default)());
app.use(_express.default.json());

_mongoose.default.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

connection.once("open", () => {
  console.log("MongoDB database connected successfully");
});
app.use("/exercises", _exercises.default);
app.use("/users", _users.default);
app.use(_errorHandler.errorHandler);
app.use("/", (req, res) => {
  res.send("!!! Welcome to Exercise-Tracker !!!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));