const jwt = require("jsonwebtoken");

module.exports = generateAuthToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
};
