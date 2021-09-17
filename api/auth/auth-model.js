const db = require("../../data/dbConfig");

const findByUsername = (username) => {
  return db("users").where("username", "=", username).first();
};

const addUser = (user) => {
  return db("users").returning(["id", "username", "password"]).insert(user);
};

module.exports = {
  findByUsername,
  addUser,
};
