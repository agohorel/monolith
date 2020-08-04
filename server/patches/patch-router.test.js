/**
 * @jest-environment node
 */

const db = require("../db/connections");
const dbModel = require("../db/dbModel");
const server = require("../api/server");
const request = require("supertest");

afterAll((done) => {
  dbModel.closeConnection();
  done();
});

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

describe("Patch CRUD route tests", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE TABLE versions, patches RESTART IDENTITY CASCADE");
    await db.migrate.latest().then(() => db.seed.run());
  });

  it("POST - Should create a patch", async () => {
    const patch = {
      user_id: 1,
      user_name: "johndoe",
      name: "shred12",
      image_url: "www.image.com",
      preview_url: "www.preview.com",
      repo_url: "www.repo.com",
      homepage_url: "www.homepage.com",
      version: "1.0",
      file_url: "www.file.com",
      description: "1.0 release woot",
      releaseStatuses: "1",
      operatingSystems: ["1", "2"],
      platforms: ["1"],
      categories: ["2"],
      tags: ["1", "2"],
    };

    const res = await request(server)
      .post("/api/patches/add-patch")
      .send(patch);

    expect(res.status).toEqual(201);
    expect(res.body.msg).toContain("Successfully created patch");
  });

  it("GET - Should return a patch by ID", async () => {
    const res = await request(server).get("/api/patches/1");
    expect(res.status).toEqual(200);
    expect(res.body.name).toBeDefined();
    expect(res.body.authorName).toBeDefined();
    expect(res.body.description).toBeDefined();
  });

  it("PUT - should update a patch", async () => {
    const patchData = {
      name: "testpatch ULTIMATE EDITION",
      operatingSystems: ["4", "5"],
      platforms: ["1"],
      categories: ["1"],
      tags: ["1", "4"],
    };

    const res = await request(server).put(`/api/patches/1`).send(patchData);

    expect(res.status).toEqual(200);
    expect(res.body.msg).toContain("Successfully updated patch");
  });

  it("DELETE - should remove a patch", async () => {
    const res = await request(server).delete("/api/patches/1");
    const patch = await dbModel.findBy("patches", { id: 1 });

    expect(res.status).toEqual(200);
    expect(patch).toBeUndefined();
  });
});

describe("Patch Version CRUD tests", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE TABLE versions, patches RESTART IDENTITY CASCADE");
    await db.migrate.latest().then(() => db.seed.run());
  });

  it("POST - Should create a patch version", async () => {
    const version = {
      version: "1.1",
      version_description: "1.1 - hotfixes and perf improvements",
      linux_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      macOS_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      windows_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      releaseStatuses: ["1"],
    };
    const res = await request(server)
      .post("/api/patches/1/versions")
      .send(version);

    expect(res.status).toEqual(201);
    expect(res.body.msg).toContain("Successfully created patch version");
  });

  it("GET - Should retrieve a patch version", async () => {
    const res = await request(server).get("/api/patches/versions/3");

    expect(res.status).toEqual(200);
    expect(res.body.version).toBeDefined();
    expect(res.body.description).toBeDefined();
  });

  it("PUT - Should update a patch version", async () => {
    const versionUpdate = {
      version: "1.3",
      version_description:
        "1.3 - rendering improvements and reduced input latency!",
      linux_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      macOS_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      windows_file:
        "4_za1b6b531d1ed4c6d78110a17_f103190dba683dbef_d20200525_m210918_c001_v0001134_t0032",
      releaseStatuses: ["2"],
    };

    const res = await request(server)
      .put("/api/patches/versions/3")
      .send(versionUpdate);

    const version = await dbModel.findBy("versions", { id: 3 });

    expect(res.status).toEqual(200);
    expect(res.body.msg).toContain("Successfully updated patch version");
    expect(version).toEqual(
      expect.objectContaining({
        version_name: versionUpdate.version,
        description: versionUpdate.version_description,
      })
    );
  });

  it("DELETE - Should remove a patch version", async () => {
    const res = await request(server).delete("/api/patches/versions/3");
    const deletedItem = await dbModel.findBy("versions", { id: 3 });

    expect(res.status).toEqual(200);
    expect(deletedItem).toBeUndefined();
  });
});

async function testMetadataRoute(endpoint, target_field) {
  const res = await request(server).get(endpoint);
  expect(res.status).toEqual(200);
  expect(res.body[target_field]).toBeDefined();
  expect(res.body[target_field].length).toBeTruthy();
}
