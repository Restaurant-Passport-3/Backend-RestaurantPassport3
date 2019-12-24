const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  console.log("getting restaurants");
  return db("restaurants");
}

function findBy(filter) {
  return db("restaurants").where(filter);
}

async function add(restaurant) {
  const [id] = await db("users").insert(user);

  return findById(id).first();
}

function findById(id) {
  return db("restaurants")
    .where({ id })
    .first();
}
