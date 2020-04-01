exports.seed = function(knex) {
  return knex("patches").insert([
    {
      name: "aleph",
      image_url: "https://www.aleph.zone/img/3_mobile.jpg",
      preview_url: "https://www.aleph.zone/#demonstration-page",
      homepage_url: "https://www.aleph.zone",
      repo_url: "https://www.github.com/agohorel/aleph"
    }
  ]);
};
