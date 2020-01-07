exports.up = function(knex) {
  return knex.schema.createTable("passports", passports => {
    passports.integer("user_id").notNullable();

    passports.string("restaurant_id", 128).notNullable();

    passports.date("date");

    passports.integer("rating");

    passports.string("notes", 512);

    passports
      .boolean("stamped")
      .notNullable()
      .defaultsTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("passports");
};
