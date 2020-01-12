exports.up = function(knex) {
  return knex.schema.createTable("restaurants", restaurants => {
    restaurants
      .string("id", 128)
      .notNullable()
      .unique();

    restaurants.string("name", 128).notNullable();

    restaurants.string("category1", 128);
    restaurants.string("category2", 128);
    restaurants.string("category3", 128);

    restaurants.string("address", 128).notNullable();

    restaurants.string("city", 128).notNullable();

    restaurants.string("state", 128).notNullable();

    restaurants.string("zipcode", 128).notNullable();

    restaurants.string("phone_number", 128).notNullable();

    restaurants.string("website_url", 256).notNullable();

    restaurants.string("img_url", 256);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("restaurants");
};
