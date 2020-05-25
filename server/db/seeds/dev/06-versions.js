exports.seed = function (knex) {
  return knex("versions")
    .insert([
      {
        version_name: "v.0.3.0",
        description: "improved controls",
        patch_fk: 1,
      },
      {
        version_name: "v.0.4.0",
        description:
          "add multi-display support, performance & QoL improvements, updated p5 to 0.9.0",
        patch_fk: 1,
      },
    ])
    .then(function () {
      return knex("version_files").insert([
        {
          linux_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          mac_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          windows_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          version_fk: 1,
        },
        {
          linux_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          mac_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          windows_file_id:
            "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
          version_fk: 2,
        },
      ]);
    });
};
