const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config/secrets");

module.exports = (req, res, next) => {
  if (!req.headers.Authorization) {
    res.status(401).json({ message: "token required" });
  } else {
    jwt.verify(req.headers.Authorization, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "token invalid" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
