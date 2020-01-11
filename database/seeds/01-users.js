const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "user",
      email: "user@user.com",
      password: bcrypt.hashSync("user", 10),
      name: "Test User",
      location: "66202"
    },
    {
      username: "hugo@hugo.com",
      email: "hugo@hugo.com",
      password: bcrypt.hashSync("hugohugo", 10),
      name: "Hugo Oliveira",
      location: "66106"
    },
    {
      username: "tay@tay.com",
      email: "tay@tay.com",
      password: bcrypt.hashSync("taytay", 10),
      name: "Taylor Schobs",
      location: "Lisbon"
    }
  ]);
};
