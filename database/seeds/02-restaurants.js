exports.seed = function(knex) {
  return knex("restaurants").insert([
    {
      id: "QhzJXO6E_oLAx1Wz1Z_T2g",
      name: "Joe's Kansas City Bar-B-Que",
      address: "3002 W 47th Ave",
      city: "Kansas City",
      state: "KS",
      zipcode: "66103",
      phone_number: "+19137223366",
      website_url:
        "https://www.yelp.com/biz/joes-kansas-city-bar-b-que-kansas-city-3?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
      img_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/yDnNC9K0SWnOOV2IEyOCjw/o.jpg"
    },
    {
      id: "lPtvU9WezDkRzEvJge4sFw",
      name: "Filling Station Coffee - Overland Park,",
      address: "7420 Johnson Dr",
      city: "Overland Park",
      state: "KS",
      zipcode: "66202",
      phone_number: "+19138313326",
      website_url:
        "https://www.yelp.com/biz/filling-station-coffee-overland-park-overland-park?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
      img_url:
        "https://s3-media1.fl.yelpcdn.com/bphoto/Veue4hwJ5YR5aSv00uBIeA/o.jpg"
    },
    {
      id: "EMIHhPOUxZpnnXpwjOot6w",
      name: "R.J.'s Bob-Be-Que Shack",
      address: "5835 Lamar Ave",
      city: "Mission",
      state: "KS",
      zipcode: "66202",
      phone_number: "+19132627300",
      website_url:
        "https://www.yelp.com/biz/r-j-s-bob-be-que-shack-mission?adjust_creative=kinvXEM0dE5rw0AmScmMOw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=kinvXEM0dE5rw0AmScmMOw",
      img_url:
        "https://s3-media1.fl.yelpcdn.com/bphoto/fCw-titamiOiQvO3BrqFOA/o.jpg"
    }
  ]);
};
