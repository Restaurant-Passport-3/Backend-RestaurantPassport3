const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve user" });
    });
});

router.get("/:id/passport", validateUserId, (req, res) => {
  Users.findPassportByUserId(req.params.id)
    .then(passports => {
      // passports.map(i => {
      //   if (i.stamped === 0) {
      //     i.stamped = false;
      //   } else if (i.stamped === 1) {
      //     i.stamped = true;
      //   }
      // });
      res.status(200).json(passports);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve passport" });
    });
});

function validateUserId(req, res, next) {
  Users.findById(req.params.id).then(user => {
    if (user) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
}

module.exports = router;
