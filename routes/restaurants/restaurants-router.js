const router = require("express").Router();

const Restaurants = require("./restaurants-model.js");

router.get("/", (req, res) => {
  Restaurants.find()
    .then(restaurants => {
      res.status(200).json(restaurants);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve restaurants" });
    });
});

router.get("/:id", validateRestaurantId, (req, res) => {
  Restaurants.findById(req.params.id)
    .then(restaurant => {
      res.status(200).json(restaurant);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve restaurant" });
    });
});

router.post("/", validateNewRestaurant, (req, res) => {
  const restaurant = req.body;
  Restaurants.add(restaurant)
    .then(response => {
      res.status(201).json({ message: "Restaurant added successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not add restaurant" });
    });
});

// MIDDLEWARE
function validateRestaurantId(req, res, next) {
  Restaurants.findById(req.params.id).then(restaurant => {
    if (restaurant) {
      next();
    } else {
      res.status(404).json({
        message: "The restaurant with the specified ID does not exist."
      });
    }
  });
}

function validateNewRestaurant(req, res, next) {
  const messages = [];

  if (!Object.keys(req.body).length > 0) {
    console.log("Add new restaurant 400 error. Missing restaurant data.");
    messages.push("missing restaurant data");
  }

  if (!req.body.id) {
    messages.push("Missing restaurant ID");
  }

  if (!req.body.name) {
    messages.push("Missing restaurant name");
  }
  if (!req.body.address) {
    messages.push("Missing restaurant address");
  }
  if (!req.body.city) {
    messages.push("Missing restaurant city");
  }
  if (!req.body.state) {
    messages.push("Missing restaurant state");
  }
  if (!req.body.zipcode) {
    messages.push("Missing restaurant zipcode");
  }
  if (!req.body.phone_number) {
    messages.push("Missing restaurant phone number");
  }
  if (!req.body.website_url) {
    messages.push("Missing restaurant url");
  }

  if (messages.length > 0) {
    res.status(400).json(messages);
  } else {
    Restaurants.findById(req.body.id).then(restaurant => {
      if (restaurant) {
        console.log(
          "Add new restaurant 409 error. Restaurant is already in database."
        );
        res.status(409).json({ message: "Restaurant is already in database." });
      } else {
        next();
      }
    });
  }
}

module.exports = router;
