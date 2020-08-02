const db = require("../db/connections");
const { generateToken } = require("../utils/tokenUtils");
const server = require("../api/server");
const request = require("supertest");

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
