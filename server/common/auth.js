const jwt = require("jsonwebtoken");

module.exports = generateAuthToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
  return token;
};
