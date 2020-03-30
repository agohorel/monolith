exports.up = function(knex) {
  return knex.schema
    .createTable("patches", tbl => {
      tbl.increments();
      tbl.string("name", 256).notNullable();
      tbl.string("image_url");
      tbl.string("preview_url");
      tbl.string("repo_url");
    })
    .createTable("user_patch", tbl => {
      tbl.increments();

      tbl
        .integer("user_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("versions", tbl => {
      tbl.increments();

      tbl.string("name", 256).notNullable();
      tbl.string("file_url").notNullable();
      tbl.string("description");

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("release_statuses", tbl => {
      tbl.increments();

      tbl.string("release_status", 128).notNullable();
    })
    .createTable("version_status", tbl => {
      tbl.increments();

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("version_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("release_statuses")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("operating_systems", tbl => {
      tbl.increments();

      tbl.string("os_name", 128).notNullable();
    })
    .createTable("patch_os", tbl => {
      tbl.increments();

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("operating_system_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("operating_systems")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("platforms", tbl => {
      tbl.increments();

      tbl.string("platform_name", 128).notNullable();
    })
    .createTable("patch_platform", tbl => {
      tbl.increments();

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("platform_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("platforms")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("categories", tbl => {
      tbl.increments();

      tbl.string("category_name", 128).notNullable();
    })
    .createTable("patch_category", tbl => {
      tbl.increments();

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("category_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("tags", tbl => {
      tbl.increments();

      tbl.string("tag_name", 128).notNullable();
    })
    .createTable("patch_tags", tbl => {
      tbl.increments();

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("tag_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tags")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("patch_tags")
    .dropTableIfExists("tags")
    .dropTableIfExists("patch_category")
    .dropTableIfExists("categories")
    .dropTableIfExists("patch_platform")
    .dropTableIfExists("platforms")
    .dropTableIfExists("patch_os")
    .dropTableIfExists("operating_systems")
    .dropTableIfExists("version_status")
    .dropTableIfExists("release_statuses")
    .dropTableIfExists("versions")
    .dropTableIfExists("user_patches")
    .dropTableIfExists("patches");
};
