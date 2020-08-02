/**
 * @jest-environment node
 */

const db = require("../db/connections");
const dbModel = require("../db/dbModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashPassword } = require("../utils/authUtils");
const server = require("../api/server");
const request = require("supertest");

afterAll((done) => {
  dbModel.closeConnection();
  done();
});

describe("Environment test", () => {
  it("Should be using the test environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("Should have DB user credentials in .env", () => {
    expect(process.env.DB_USER).toBeDefined();
    expect(process.env.DB_PASSWORD).toBeDefined();
  });

  it("Should have a JWT secret in .env", () => {
    expect(process.env.JWT_SECRET).toBeDefined();
  });

  it("Should have B2 credentials in .env", () => {
    expect(process.env.B2_KEY_ID).toBeDefined();
    expect(process.env.B2_APPLICATION_KEY).toBeDefined();
  });
});

describe("User Registration tests", () => {
  beforeEach(async () => {
    await db("users").delete();
  });

  const password = "quake777!";
  const testUser = {
    username: "johndoe",
    password: hashPassword(password),
    email: "jdoe@email.net",
    bio: "hello world",
  };

  it("Should add a user to the database", async () => {
    await dbModel.insert("users", testUser, "id");
    const users = await dbModel.find("users");

    expect(users).toEqual(
      expect.arrayContaining([expect.objectContaining(testUser)])
    );
  });

  describe("User Registration via POST api/auth/register", () => {
    it("Responds with 201 and persists user to DB", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({
          ...testUser,
          password,
        });
      const users = await dbModel.find("users");

      expect(response.status).toEqual(201);
      expect(users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            username: testUser.username,
            email: testUser.email,
            bio: testUser.bio,
          }),
        ])
      );
    });
  });
});
