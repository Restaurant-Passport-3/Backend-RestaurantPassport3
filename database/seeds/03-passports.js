exports.seed = function(knex) {
  return knex("passports").insert([
    {
      user_id: 1,
      restaurant_id: "QhzJXO6E_oLAx1Wz1Z_T2g",
      date: Date.now()
    },
    {
      user_id: 1,
      restaurant_id: "lPtvU9WezDkRzEvJge4sFw",
      date: Date.now()
    },
    {
      user_id: 2,
      restaurant_id: "lPtvU9WezDkRzEvJge4sFw",
      date: Date.now()
    },
    {
      user_id: 2,
      restaurant_id: "EMIHhPOUxZpnnXpwjOot6w",
      date: Date.now()
    }
  ]);
};
