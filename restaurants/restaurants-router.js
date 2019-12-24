const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(
  "rqo_rhFraMCYt0C0ALvjvQh16D-fQ6JdojIQ1lO7QLvvHZ9Iy46A9N91T4NY3FZavh--o8Rk-sbmsgbyUg-6l-IM9xGWQIs2N6J0WqXytqHrHPNB3R--RJT_B1f9XXYx"
);

const Restaurants = require("./restaurants-model.js");

router.get("/", (req, res) => {
  console.log("get");
  Restaurants.find()
    .then(restaurants => {
      res.status(200).json(restaurants);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not retrieve restaurants" });
    });
});

router.get("/explore", (req, res) => {
  // for (const key in req.query) {
  //   console.log(key, req.query[key]);
  // }

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
      // res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
