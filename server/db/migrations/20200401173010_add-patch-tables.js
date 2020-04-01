const { onUpdateTrigger } = require("../../knexfile.js");

exports.up = function(knex) {
  return knex.schema
    .createTable("patches", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl.string("name", 256).notNullable();
      tbl.string("image_url");
      tbl.string("preview_url");
      tbl.string("repo_url");
      tbl.string("homepage_url");
    })

    .createTable("user_patches", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .integer("user_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("versions", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl.string("version_name", 128).notNullable();
      tbl.string("description");

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("release_statuses", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("release_status", 128)
        .notNullable()
        .unique();
    })

    .createTable("version_status", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("version_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("versions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("status_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("release_statuses")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("version_files", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl.string("linux_file_url");
      tbl.string("mac_file_url");
      tbl.string("windows_file_url");
      tbl.string("android_file_url");
      tbl.string("ios_file_url");

      tbl
        .integer("version_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("versions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("operating_systems", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("os_name")
        .notNullable()
        .unique();
    })

    .createTable("patch_os", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("os_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("operating_systems")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("platforms", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("platform_name", 256)
        .notNullable()
        .unique();
    })

    .createTable("patch_platform", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("platform_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("platforms")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("categories", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("category_name", 128)
        .notNullable()
        .unique();
    })

    .createTable("patch_category", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("category_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("tags", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);
      tbl
        .string("tag", 128)
        .notNullable()
        .unique();
    })

    .createTable("patch_tags", tbl => {
      tbl.increments();
      tbl.timestamps(true, true);

      tbl
        .integer("patch_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("patches")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("tag_fk")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .then(() => knex.raw(onUpdateTrigger("patches")))
    .then(() => knex.raw(onUpdateTrigger("user_patches")))
    .then(() => knex.raw(onUpdateTrigger("versions")))
    .then(() => knex.raw(onUpdateTrigger("release_statuses")))
    .then(() => knex.raw(onUpdateTrigger("version_status")))
    .then(() => knex.raw(onUpdateTrigger("version_files")))
    .then(() => knex.raw(onUpdateTrigger("operating_systems")))
    .then(() => knex.raw(onUpdateTrigger("patch_os")))
    .then(() => knex.raw(onUpdateTrigger("platforms")))
    .then(() => knex.raw(onUpdateTrigger("patch_platform")))
    .then(() => knex.raw(onUpdateTrigger("categories")))
    .then(() => knex.raw(onUpdateTrigger("patch_category")))
    .then(() => knex.raw(onUpdateTrigger("tags")))
    .then(() => knex.raw(onUpdateTrigger("patch_tags")));
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
    .dropTableIfExists("version_files")
    .dropTableIfExists("version_status")
    .dropTableIfExists("release_statuses")
    .dropTableIfExists("versions")
    .dropTableIfExists("user_patches")
    .dropTableIfExists("patches");
};
