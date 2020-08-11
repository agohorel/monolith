/**
 * @jest-environment node
 */

const db = require("../db/connections");
const dbModel = require("../db/dbModel");
const server = require("../api/server");
const request = require("supertest");
const { version, updateVersionData } = require("./version-router-test-data.js");

afterAll((done) => {
  dbModel.closeConnection();
  done();
});

describe("Patch Version CRUD tests", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE TABLE versions, patches RESTART IDENTITY CASCADE");
    await db.migrate.latest().then(() => db.seed.run());
  });

  it("POST - Should create a patch version", async () => {
    const res = await request(server).post("/api/versions/1").send(version);

    expect(res.status).toEqual(201);
    expect(res.body.msg).toContain("Successfully created patch version");
  });

  it("GET - Should retrieve a patch version", async () => {
    const res = await request(server).get("/api/versions/3");

    expect(res.status).toEqual(200);
    expect(res.body.version).toBeDefined();
    expect(res.body.description).toBeDefined();
  });

  it("PUT - Should update a patch version", async () => {
    const res = await request(server)
      .put("/api/versions/3")
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
    const res = await request(server).delete("/api/versions/3");
    const deletedItem = await dbModel.findBy("versions", { id: 3 });

    expect(res.status).toEqual(200);
    expect(deletedItem).toBeUndefined();
  });
});
