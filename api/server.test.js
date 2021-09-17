const db = require("../data/dbConfig");
const request = require("supertest");
const server = "./server.js";

beforeEach(async () => {
  await db.truncate("users");
});

describe("/api/auth/register", () => {
  it("registration successful", async () => {
    const successfulStatusCode = 201;
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "admin", password: "test" });
    expect(response.status).toEqual(successfulStatusCode);
  });

  it("registration failed", async () => {
    const failedStatusCode = 400;
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "admin" });
    expect(response.status).toEqual(failedStatusCode);
  });
});

describe("/api/auth/login", () => {
  it("login successful", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "admin", password: "test" });
    const successfulStatusCode = 201;
    const response = await request(server);
    expect(response.status).toEqual(successfulStatusCode);
  });

  it("login failed", async () => {
    const failedStatusCode = 400;
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "admin" });
    expect(response.status).toEqual(failedStatusCode);
  });
});
