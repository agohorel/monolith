exports.seed = function(knex) {
  return knex("versions").insert([
    {
      name: "v.0.3.0",
      file_url:
        "https://github.com/agohorel/aleph/releases/download/v0.3.0-pre-alpha/aleph-win32-x64.zip",
      description: "improved controls",
      patch_fk: 1
    },
    {
      name: "v.0.4.0",
      file_url:
        "https://github.com/agohorel/aleph/releases/download/v.0.4.0-pre-alpha/aleph-win32-x64.zip",
      description:
        "add multi-display support, performance & QoL improvements, updated p5 to 0.9.0",
      patch_fk: 1
    }
  ]);
};
