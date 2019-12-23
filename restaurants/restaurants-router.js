const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(
  "rqo_rhFraMCYt0C0ALvjvQh16D-fQ6JdojIQ1lO7QLvvHZ9Iy46A9N91T4NY3FZavh--o8Rk-sbmsgbyUg-6l-IM9xGWQIs2N6J0WqXytqHrHPNB3R--RJT_B1f9XXYx"
);

router.get("/", (req, res) => {
  console.log("checking restaurants");

  client
    .search({
      // term: "Four Barrel Coffee",

      //can be name of location or zipcode!
      location: "66202"
    })
    .then(response => {
      res.status(200).json(response.jsonBody.businesses[0].name);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
