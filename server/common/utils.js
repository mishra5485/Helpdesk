const jwt = require("jsonwebtoken");
var moment = require("moment");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = generateAuthToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = verifyGoogleJWT = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return { payload, userid };
};

module.exports = getTimestamp = () => {
  return (unixTimestamp = Math.ceil(moment().valueOf() / 1000));
};
