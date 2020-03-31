exports.seed = function(knex) {
  return knex("patch_os")
    .insert([
      {
        operating_system_fk: 1,
        patch_fk: 1
      },
      {
        operating_system_fk: 2,
        patch_fk: 1
      },
      {
        operating_system_fk: 3,
        patch_fk: 1
      }
    ])
    .then(function() {
      return knex("patch_platform").insert([
        {
          platform_fk: 1,
          patch_fk: 1
        }
      ]);
    })
    .then(function() {
      return knex("patch_category").insert([
        {
          category_fk: 1,
          patch_fk: 1
        }
      ]);
    })
    .then(function() {
      return knex("patch_tags").insert([
        {
          tag_fk: 1,
          patch_fk: 1
        },
        {
          tag_fk: 2,
          patch_fk: 1
        }
      ]);
    });
};
