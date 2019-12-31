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

router.put(
  "/:id/passport",
  validateUserId,
  validatePassportChanges,
  (req, res) => {
    Users.updatePassportItem(req.params.id, req.body.restaurant_id, req.body)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not edit passport" });
      });
  }
);

router.delete("/:id/passport", validateUserId, (req, res) => {
  if (!req.body.restaurant_id) {
    res.status(400).json({ message: "Missing restaurant ID" });
  } else {
    Users.deletePassportItem(req.params.id, req.body.restaurant_id)
      .then(response => {
        if (response === 1) {
          res
            .status(200)
            .json({ message: "Passport item deleted successfully." });
        } else {
          res.status(404).json({
            message:
              "The restaurant with the specified ID does not exist on this passport."
          });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: "Could not delete restaurant on passport" });
      });
  }
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

function validatePassportChanges(req, res, next) {
  const messages = [];
  //
  if (!req.body.restaurant_id) {
    messages.push("Missing restaurant ID");
  }
  //
  if (!req.body.rating) {
    messages.push("Missing restaurant rating");
  } else if (!Number.isInteger(req.body.rating)) {
    messages.push("Restaurant rating is not an integer");
  } else if (req.body.rating > 5 || req.body.rating < 0) {
    messages.push("Restaurant rating must be between 1 and 5");
  }
  //
  if (!req.body.notes) {
    messages.push("Missing restaurant notes");
  }
  //
  if (req.body.stamped !== true && req.body.stamped !== false) {
    messages.push("Missing restaurant stamped");
  }

  if (messages.length > 0) {
    console.log(messages);
    res.status(400).json({ error: messages });
  } else {
    next();
  }
}

module.exports = router;
