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
    .then(saved => {
      res.status(201).json(saved);
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

module.exports = router;
