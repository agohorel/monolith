module.exports.categories = [
  {
    endpoint: "/api/patches/os-list",
    target_field: "operating_systems",
  },
  {
    endpoint: "/api/patches/platform-list",
    target_field: "platforms",
  },
  {
    endpoint: "/api/patches/category-list",
    target_field: "categories",
  },
  {
    endpoint: "/api/patches/status-list",
    target_field: "release_statuses",
  },
];

module.exports.patch = {
  author_id: 1,
  author_name: "johndoe",
  name: "shred12",
  image_id: "www.image.com",
  preview_url: "www.preview.com",
  repo_url: "www.repo.com",
  homepage_url: "www.homepage.com",
  file_url: "www.file.com",
  description: "this is a patch that does something",
  operating_systems: [1, 2],
  platforms: [1],
  categories: [2],
  tags: [2, 3],
};

module.exports.updatePatchData = {
  name: "testpatch ULTIMATE EDITION",
  operating_systems: [{ id: 4 }, { id: 5 }],
  platforms: [{ id: 1 }],
  categories: [{ id: 1 }],
  tags: [{ id: 4 }, { id: 5 }],
};

module.exports.version = {
  version: "1.1",
  version_description: "1.1 - hotfixes and perf improvements",
  linux_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  macOS_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  windows_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  release_status: "1",
};

module.exports.updateVersionData = {
  version: "1.3",
  version_description:
    "1.3 - rendering improvements and reduced input latency!",
  linux_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  macOS_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  windows_file:
    "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
  release_status: "2",
};
