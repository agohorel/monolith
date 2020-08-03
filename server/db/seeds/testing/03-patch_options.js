exports.seed = function(knex) {
  return knex("operating_systems")
    .insert([
      { os_name: "linux" },
      { os_name: "windows" },
      { os_name: "macOS" },
      { os_name: "android" },
      { os_name: "iOS" }
    ])
    .then(function() {
      return knex("platforms").insert([
        { platform_name: "max" },
        { platform_name: "puredata" },
        { platform_name: "reaktor" },
        { platform_name: "touchdesigner" },
        { platform_name: "aleph" },
        { platform_name: "processing" },
        { platform_name: "p5.js" },
        { platform_name: "openframeworks" }
      ]);
    })
    .then(function() {
      return knex("categories").insert([
        { category_name: "audio" },
        { category_name: "video" },
        { category_name: "image" },
        { category_name: "utility" }
      ]);
    })
    .then(function() {
      return knex("tags").insert([
        { tag: "granular" },
        { tag: "shader" },
        { tag: "projection mapping" },
        { tag: "VR" },
        { tag: "synthesis" }
      ]);
    })
    .then(function() {
      return knex("release_statuses").insert([
        { release_status: "in development" },
        { release_status: "released" },
        { release_status: "deprecated" }
      ]);
    });
};
