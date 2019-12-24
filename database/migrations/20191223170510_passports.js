exports.up = function(knex) {
  return knex.schema.createTable("passports", users => {
    users.string("user_id", 128).notNullable();

    users.string("restaurant_id", 128).notNullable();

    users.integer("rating");

    users.string("notes", 512);

    users
      .boolean("stamped")
      .notNullable()
      .defaultsTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("passports");
};
