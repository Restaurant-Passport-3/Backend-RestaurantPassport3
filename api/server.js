const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const authenticate = require("../routes/auth/authenticate-middleware.js");
const authRouter = require("../routes/auth/auth-router.js");
const usersRouter = require("../routes/users/users-router.js");
const restaurantsRouter = require("../routes/restaurants/restaurants-router.js");
const exploreRouter = require("../routes/restaurants/explore-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/restaurants", restaurantsRouter);
server.use("/api/explore", exploreRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Restaurant Passport API",
    api: "up",
    dbenv: process.env.DB_ENV
  });
});

module.exports = server;
