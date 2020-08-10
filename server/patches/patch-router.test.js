/**
 * @jest-environment node
 */

const db = require("../db/connections");
const dbModel = require("../db/dbModel");
const server = require("../api/server");
const request = require("supertest");
const {
  categories,
  patch,
  updatePatchData,
  version,
  updateVersionData,
} = require("./patch-router-testdata.js");

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
    const res = await request(server)
      .post("/api/patches/add-patch")
      .send(patch);

    expect(res.status).toEqual(201);
    expect(res.body.msg).toContain("Successfully created patch");
  });

  it("GET - Should return a patch by ID", async () => {
    const res = await request(server).get("/api/patches/1");
    expect(res.status).toEqual(200);
    expect(res.body.details.name).toBeDefined();
    expect(res.body.details.author_name).toBeDefined();
    expect(res.body.details.description).toBeDefined();
  });

  it("PUT - should update a patch", async () => {
    const res = await request(server)
      .put(`/api/patches/1`)
      .send(updatePatchData);

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
    const res = await request(server)
      .put("/api/patches/versions/3")
      .send(updateVersionData);

    const version = await dbModel.findBy("versions", { id: 3 });

    expect(res.status).toEqual(200);
    expect(res.body.msg).toContain("Successfully updated patch version");
    expect(version).toEqual(
      expect.objectContaining({
        version_name: updateVersionData.version,
        description: updateVersionData.version_description,
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
