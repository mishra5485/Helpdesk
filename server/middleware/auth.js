require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const headerToken = req.headers.authorization.split(" ")[1];
    const token =
      req.body.token || req.query.token || req.params.token || headerToken;
    if (!token) return res.status(401).send("Access denied. No token provided");

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
