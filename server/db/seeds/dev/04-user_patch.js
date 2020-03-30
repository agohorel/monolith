exports.seed = function(knex) {
  return knex("user_patch").insert([
    {
      user_fk: 1,
      patch_fk: 1
    }
  ]);
};
