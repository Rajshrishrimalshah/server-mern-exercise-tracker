"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

const errorHandler = (err, req, res, next) => {
  const error = {
    error: err.error ? err.error : "Error",
    message: err.message ? err.message : "Error",
    status: err.status ? err.status : 500,
    timestamp: new Date()
  };
  res.status(error.status).json(error);
};

exports.errorHandler = errorHandler;