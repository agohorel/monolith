exports.seed = function(knex) {
  return knex("versions")
    .insert([
      {
        version_name: "v.0.3.0",
        description: "improved controls",
        patch_fk: 1
      },
      {
        version_name: "v.0.4.0",
        description:
          "add multi-display support, performance & QoL improvements, updated p5 to 0.9.0",
        patch_fk: 1
      }
    ])
    .then(function() {
      return knex("version_files").insert([
        {
          linux_file_url:
            "https://github.com/agohorel/aleph/releases/download/v0.3.0-pre-alpha/aleph-linux-x64.tar",
          mac_file_url:
            "https://github.com/agohorel/aleph/releases/download/v0.3.0-pre-alpha/aleph-darwin-x64.zip",
          windows_file_url:
            "https://github.com/agohorel/aleph/releases/download/v0.3.0-pre-alpha/aleph-win32-x64.zip",
          version_fk: 1
        },
        {
          linux_file_url:
            "https://github.com/agohorel/aleph/releases/download/v.0.4.0-pre-alpha/aleph-linux-x64.tar",
          mac_file_url:
            "https://github.com/agohorel/aleph/releases/download/v.0.4.0-pre-alpha/aleph-darwin-x64.zip",
          windows_file_url:
            "https://github.com/agohorel/aleph/releases/download/v.0.4.0-pre-alpha/aleph-win32-x64.zip",
          version_fk: 2
        }
      ]);
    });
};
