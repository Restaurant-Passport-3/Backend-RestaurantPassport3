const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,

  addPassport,
  findPassportByUserId,
  findPassportByUserAndResId,
  updatePassportItem,
  deletePassportItem
};

function find() {
  // return db("users").select("id", "username", "password");
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  // const [id] = await db("users").insert(user);

  // return findById(id).first();
  return db("users").insert(user);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function update(user_id, changes) {
  return db("users")
    .where("id", user_id)
    .update({
      email: changes.email,
      password: changes.password,
      name: changes.name,
      location: changes.location
    })
    .then(count => (count > 0 ? this.findById(user_id).first() : null));
}

async function addPassport(user_id, restaurant_id, date) {
  const pass = await db("passports").insert({
    user_id: user_id,
    restaurant_id: restaurant_id,
    date: date
  });

  console.log(pass);

  return findPassportByUserAndResId(user_id, restaurant_id);
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
      "p.date",
      "u.id as user_id"
    )
    .join("users as u", "u.id", "p.user_id")
    .join("restaurants as r", "r.id", "p.restaurant_id")
    .where("user_id", user_id);
}

function findPassportByUserAndResId(user_id, restaurant_id) {
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
      "p.date",
      "u.id as user_id"
    )
    .join("users as u", "u.id", "p.user_id")
    .join("restaurants as r", "r.id", "p.restaurant_id")
    .where("user_id", user_id)
    .andWhere("restaurant_id", restaurant_id);
}

function updatePassportItem(user_id, restaurant_id, changes) {
  console.log(changes);
  return db("passports")
    .where("user_id", user_id)
    .andWhere("restaurant_id", restaurant_id)
    .update({
      notes: changes.notes,
      stamped: changes.stamped,
      rating: changes.rating
    })
    .then(count =>
      count > 0
        ? this.findPassportByUserAndResId(user_id, restaurant_id).first()
        : null
    );
}

async function deletePassportItem(user_id, restaurant_id) {
  console.log(`user_id: ${user_id} // restaurant_id: ${restaurant_id}`);
  await db("passports")
    .where("user_id", user_id)
    .andWhere("restaurant_id", restaurant_id)
    .del();

  return 1;
}
