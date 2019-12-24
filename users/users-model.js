const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,

  findPassportByUserId
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id).first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findPassportByUserId(user_id) {
  return db("passports as p")
    .select(
      "p.restaurant_id",
      "r.name",
      "r.address",
      "r.city",
      "r.state",
      "r.zipcode",
      "r.phone_number",
      "r.website_url",
      "r.img_url",
      "p.rating",
      "p.notes",
      "p.stamped",
      "u.id as user_id"
    )
    .join("users as u", "u.id", "p.user_id")
    .join("restaurants as r", "r.id", "p.restaurant_id")
    .where("user_id", user_id);
}
