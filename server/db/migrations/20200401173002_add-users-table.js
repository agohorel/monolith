const { onUpdateTrigger } = require("../../knexfile.js");

exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl
        .string("email", 256)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("bio", 1024);
    })
    .createTable("profile_links", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl.string("profile_link").notNullable();
      tbl.string("link_title", 128).notNullable();
    })
    .then(() => knex.raw(onUpdateTrigger("users")))
    .then(() => knex.raw(onUpdateTrigger("profile_links")));
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("profile_links")
    .dropTableIfExists("users");
};
