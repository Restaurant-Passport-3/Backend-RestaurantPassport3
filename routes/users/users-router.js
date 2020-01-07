const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("./users-model.js");
const Restaurants = require("../restaurants/restaurants-model.js");

const authenticate = require("../auth/authenticate-middleware.js");

const yelp = require("yelp-fusion");
const client = yelp.client(
  "rqo_rhFraMCYt0C0ALvjvQh16D-fQ6JdojIQ1lO7QLvvHZ9Iy46A9N91T4NY3FZavh--o8Rk-sbmsgbyUg-6l-IM9xGWQIs2N6J0WqXytqHrHPNB3R--RJT_B1f9XXYx"
);

router.get("/", authenticate, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve users" });
    });
});

router.get("/:id", authenticate, validateUserId, (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve user" });
    });
});

router.put(
  "/:id",
  //authenticate,
  validateUserId,
  validateUserChanges,
  (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    Users.update(req.params.id, req.body)
      .then(response => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not update user" });
      });
  }
);

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

router.post(
  "/:id/passport",
  validateUserId,
  validateRestaurantId,
  validatePassportAdd,
  (req, res) => {
    console.log("users-router post", req.body);
    Users.addPassport(req.params.id, req.body.restaurant_id)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not add passport" });
      });
  }
);

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
  console.log(
    `user_id: ${req.params.id} // restaurant_id: ${req.body.restaurant_id}`
  );

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

async function validateRestaurantId(req, res, next) {
  Restaurants.findById(req.body.restaurant_id).then(restaurant => {
    if (restaurant) {
      next();
    } else {
      // res.status(404).json({
      //   message: "The restaurant with the specified ID does not exist."
      // });

      client
        .business(req.body.restaurant_id)
        .then(response => {
          let restaurant = {};
          const i = response.jsonBody;

          restaurant = {
            id: i.id,
            name: i.name,
            address: i.location.address1,
            city: i.location.city,
            state: i.location.state,
            zipcode: i.location.zip_code,
            phone_number: i.phone,
            website_url: i.url,
            img_url: i.image_url
          };

          Restaurants.add(restaurant)
            .then(response => {
              console.log("SENDING RESTAURANT", restaurant);
              next();
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ error: "Could not add restaurant" });
            });

          console.log(restaurant);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
}

function validateNewRestaurant(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "missing restaurant data" });
  } else if (
    !req.body.id ||
    !req.body.name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipcode ||
    !req.body.phone_number ||
    !req.body.website_url ||
    !req.body.img_url
  ) {
    res.status(400).json({ message: "Missing registration fields" });
  } else {
    Restaurants.findById(req.body.id).then(restaurant => {
      if (restaurant) {
        res.status(409).json({ message: "Restaurant is already in database." });
      } else {
        next();
      }
    });
  }
}

function validateUserChanges(req, res, next) {
  console.log(req.body);
  const messages = [];
  //
  if (!req.body.email) {
    messages.push("Missing email address");
  }
  //
  if (!req.body.password) {
    messages.push("Missing password");
  }
  //
  if (!req.body.name) {
    messages.push("Missing name");
  }
  //
  if (!req.body.location) {
    messages.push("Missing location");
  }

  if (messages.length > 0) {
    res.status(400).json({ error: messages });
  } else {
    next();
  }
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

function validatePassportAdd(req, res, next) {
  Users.findPassportByUserAndResId(req.params.id, req.body.restaurant_id)
    .then(response => {
      console.log(response);
      if (response.length <= 0) {
        next();
      } else {
        res
          .status(400)
          .json({ message: "Passport already contains this restaurant" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error finding restaurant on passport" });
    });
}

module.exports = router;
