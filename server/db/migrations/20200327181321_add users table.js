exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 128)
      .notNullable()
      .unique();
    tbl
      .string("email")
      .notNullable()
      .unique();
    tbl.string("password").notNullable();
    tbl.string("bio", 1024);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
