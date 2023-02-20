const jwt = require("jsonwebtoken");
var moment = require("moment");

module.exports = generateAuthToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = getTimestamp = () => {
  return (unixTimestamp = Math.ceil(moment().valueOf() / 1000));
};
