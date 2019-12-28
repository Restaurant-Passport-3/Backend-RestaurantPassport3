const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(
  "rqo_rhFraMCYt0C0ALvjvQh16D-fQ6JdojIQ1lO7QLvvHZ9Iy46A9N91T4NY3FZavh--o8Rk-sbmsgbyUg-6l-IM9xGWQIs2N6J0WqXytqHrHPNB3R--RJT_B1f9XXYx"
);

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
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/explore", (req, res) => {
  client
    .search({
      term: req.query.search ? req.query.search : "",
      //can be name of location or zipcode! required
      location: req.query.location ? req.query.location : "66202"
      // limit: 50
    })
    .then(response => {
      let restaurants = [];
      response.jsonBody.businesses.map(i => {
        restaurants.push({
          id: i.id,
          name: i.name,
          address: i.location.address1,
          city: i.location.city,
          state: i.location.state,
          zipcode: i.location.zip_code,
          phone_number: i.phone,
          website_url: i.url,
          img_url: i.image_url
        });
      });

      res.status(200).json(restaurants);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

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
