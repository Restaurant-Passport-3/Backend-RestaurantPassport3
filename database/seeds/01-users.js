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
      username: "hugo",
      email: "hugo@hugo.com",
      password: bcrypt.hashSync("hugo", 10),
      name: "Hugo Oliveira",
      location: "64105"
    }
  ]);
};
