const db = require("../data/dbConfig");
const request = require("supertest");
const server = "./server.js";

beforeEach(async () => {
  await db.truncate("users");
});
