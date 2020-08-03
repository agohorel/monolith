exports.seed = function(knex) {
  return knex("patch_os")
    .insert([
      {
        os_fk: 1,
        patch_fk: 1
      },
      {
        os_fk: 2,
        patch_fk: 1
      },
      {
        os_fk: 3,
        patch_fk: 1
      }
    ])
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
    })
    .then(function() {
      return knex("patch_platform").insert([{ patch_fk: 1, platform_fk: 5 }]);
    })
    .then(function() {
      return knex("version_status").insert([
        {
          version_fk: 1,
          status_fk: 2
        },
        {
          version_fk: 1,
          status_fk: 1
        }
      ]);
    });
};
