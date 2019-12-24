const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restaurantsRouter = require("../restaurants/restaurants-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
// server.use("/api/users", authenticate, usersRouter);
server.use("/api/users", usersRouter);
server.use("/api/restaurants", restaurantsRouter);

server.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Welcome to the Restaurant Passport API",
      api: "up",
      dbenv: process.env.DB_ENV
    });
});

module.exports = server;
