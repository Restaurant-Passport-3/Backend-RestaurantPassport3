const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post("/register", validateRegister, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", validateLogin, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res
          .status(200)
          .json({ message: `Logged in as ${user.username}.`, token });
      } else {
        res.status(401).json({ message: "Invalid user information" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret =
    process.env.JWT_SECRET || "I find your lack of faith disturbing.";

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

function validateRegister(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.location
  ) {
    res.status(400).json({ message: "Missing registration fields" });
  } else {
    next();
  }
}

function validateLogin(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Missing registration fields" });
  } else {
    next();
  }
}

module.exports = router;
