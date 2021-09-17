const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/secrets");
const users = require("./auth-model");

router.post("/register", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "username and password required" });
  } else {
    try {
      let userSearch = await users.findByUsername(req.body.username);
      if (userSearch != null) {
        res.status(400).json({ message: "username taken" });
      } else {
        let bcryptPassword = bcrypt.hashSync(req.body.password, 8);
        await users.addUser({
          username: req.body.username,
          password: bcryptPassword,
        });
        const newUser = await users.findByUsername(req.body.username);
        res.status(201).json(newUser);
      }
    } catch (err) {
      res.status(500).json({ message: "error registering account" });
    }
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "username and password required" });
  } else {
    try {
      const foundUser = await users.findByUsername(req.body.username);
      if (foundUser != null) {
        let correctPassword = bcrypt.compareSync(
          req.body.password,
          foundUser.password
        );
        if (correctPassword) {
          jwt.sign(
            { username: foundUser.username },
            JWT_SECRET,
            (err, token) => {
              if (err) {
                res.status(500).json({ message: "error trying to login" });
              } else {
                res
                  .status(200)
                  .json({ message: `welcome, ${foundUser.username}`, token });
              }
            }
          );
        } else {
          res.status(400).json({ message: "invalid credentials" });
        }
      } else {
        res.status(400).json({ message: "invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: "login error" });
    }
  }
});

module.exports = router;
