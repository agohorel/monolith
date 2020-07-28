exports.seed = function (knex) {
  return knex("patches").insert([
    {
      name: "aleph",
      author_id: 1,
      author_name: "oddlogic",
      image_id:
        "4_zc1a64511d17d5c7d78110a17_f1197fcde8ed796cd_d20200525_m210745_c001_v0001044_t0059",
      preview_url: "https://www.aleph.zone/#demonstration-page",
      homepage_url: "https://www.aleph.zone",
      repo_url: "https://www.github.com/agohorel/aleph",
      description:
        "aleph is a cross-platform desktop application and programming framework for developing and performing audio-reactive visuals using javascript and glsl",
    },
  ]);
};
