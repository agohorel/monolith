exports.seed = function(knex) {
  return knex("version_status").insert([
    {
      version_fk: 1,
      patch_fk: 1
    },
    {
      version_fk: 2,
      patch_fk: 1
    }
  ]);
};
