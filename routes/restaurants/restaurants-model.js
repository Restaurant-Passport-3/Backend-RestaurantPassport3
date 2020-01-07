const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("restaurants");
}

function findBy(filter) {
  return db("restaurants").where(filter);
}

async function add(restaurant) {
  return db("restaurants").insert(restaurant);
}

function findById(id) {
  return db("restaurants")
    .where({ id })
    .first();
}
