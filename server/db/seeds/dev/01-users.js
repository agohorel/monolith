const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "oddlogic",
      email: "test@test.net",
      password: bcrypt.hashSync("password", 12),
      bio: "hey hello hi"
    }
  ]);
};
