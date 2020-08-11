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
  operating_systems: [{ id: 1 }, { id: 2 }],
  platforms: [{ id: 2 }],
  categories: [{ id: 3 }],
  tags: [{ id: 1 }, { id: 1 }],
};

module.exports.updatePatchData = {
  name: "testpatch ULTIMATE EDITION",
  operating_systems: [{ id: 4 }, { id: 5 }],
  platforms: [{ id: 1 }],
  categories: [{ id: 1 }],
  tags: [{ id: 4 }, { id: 5 }],
};
