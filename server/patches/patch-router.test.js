/**
 * @jest-environment node
 */
const server = require("../api/server");
const request = require("supertest");

describe("Patch metadata list tests", () => {
  it("Should return a valid list of operating systems", async () => {
    await testMetadataRoute("/api/patches/os-list", "operating_systems");
  });

  it("Should return a valid list of platforms", async () => {
    await testMetadataRoute("/api/patches/platform-list", "platforms");
  });

  it("Should return a valid list of categories", async () => {
    await testMetadataRoute("/api/patches/category-list", "categories");
  });

  it("Should return a valid list of release statuses", async () => {
    await testMetadataRoute("/api/patches/status-list", "release_statuses");
  });

  it("Should return a valid list of all patch metadata", async () => {
    const categories = [
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

    for (category of categories) {
      await testMetadataRoute(category.endpoint, category.target_field);
    }
  });
});

async function testMetadataRoute(endpoint, target_field) {
  const res = await request(server).get(endpoint);
  expect(res.status).toEqual(200);
  expect(res.body[target_field]).toBeDefined();
  expect(res.body[target_field].length).toBeTruthy();
}
