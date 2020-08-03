exports.seed = function(knex) {
  return knex("profile_links").insert([
    {
      link_title: "bandcamp",
      profile_link: "https://oddlogic.bandcamp.com/"
    },
    {
      link_title: "github",
      profile_link: "https://github.com/agohorel"
    }
  ]);
};
