const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve users" }));
});

router.get("/:id/passport", (req, res) => {
  console.log(req.params.id);
  Users.findPassportByUserId(req.params.id)
    .then(passports => {
      passports.map(i => {
        if (i.stamped === 0) {
          i.stamped = false;
        } else if (i.stamped === 1) {
          i.stamped = true;
        }
      });
      res.status(200).json(passports);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve passport" });
    });
});

module.exports = router;
