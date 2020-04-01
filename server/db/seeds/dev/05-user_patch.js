exports.seed = function(knex) {
  return knex("user_patches").insert([
    {
      user_fk: 1,
      patch_fk: 1
    }
  ]);
};
