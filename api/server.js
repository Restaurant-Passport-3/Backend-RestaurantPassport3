const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
// server.use("/api/users", authenticate, usersRouter);
server.use("/api/users", usersRouter);

server.get("/test", async (req, res) => {
  res.json({ message: "alive!" });
});

module.exports = server;
