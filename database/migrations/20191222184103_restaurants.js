exports.up = function(knex) {
  return knex.schema.createTable("restaurants", users => {
    users
      .string("id", 128)
      .notNullable()
      .unique();

    users
      .string("name", 128)
      .notNullable()
      .unique();

    users
      .string("address", 128)
      .notNullable()
      .unique();

    users.string("city", 128).notNullable();

    users.string("state", 128).notNullable();

    users.string("zipcode", 128).notNullable();

    users.string("phone_number", 128).notNullable();

    users.string("website_url", 256).notNullable();

    users.string("img_url", 256);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
